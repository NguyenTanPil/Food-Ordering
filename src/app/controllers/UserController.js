const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const UserDetail = require('../models/UserDetail.js');
const Video = require('../models/Video.js');
const Restaurant = require('../models/Restaurant.js');
const Meal = require('../models/Meal.js');
const { mutipleMongooseToOject, mongooseToOject } = require('../../util/mongoose.js');
const cloudinary = require('../../middlewares/cloudinary_config.js');

class UserController {

	// [GET] /user/signup
	signup(req, res) {
		res.render('signup', { layout: 'signup' });
	}
	// [POST] /user/create_user
	async create_user(req, res) {
		// creata a new model
		const formData = req.body;
		delete formData.agree;
		const salt = await bcrypt.genSalt(10);
		formData.password = await bcrypt.hash(formData.password, salt);
		const user = new User(formData);
		user.save();
		res.redirect('/user/login');
	}
	// [GET] /user/login
	login(req, res) {
		res.render('login', { layout: 'login' });
	}
	// [POST] /user/login-process
	async login_process(req, res, next) {
		const body = req.body;
		let user = await User.findOne({ email: body.email });
		// res.json(user);
		if(user) {
			const validPassword = await bcrypt.compare(body.password, user.password);
			if(validPassword) {
				user = mongooseToOject(user);
				res.cookie('userId', user._id, {
					maxAge: 1000 * 60 * 60
				});
				const checkUser = await UserDetail.findOne({ userId: user._id });
				if(!checkUser) {
					body.userId = user._id;
					body.name = user.name;
					const userDetail = new UserDetail(body);
					userDetail.save();
				}
				res.redirect('/user');
			} else {
				res.redirect('/user/login');
			}
		} else {
			res.redirect('/user/login');
		}
	}
	// [GET] /user/my_profile
	async my_profile(req, res) {
		const userId = req.cookies['userId'];
		const infoUser = await getUserDetail(userId);
		const videosUser = await getVideos(userId);
		res.render('my_profile', { layout: 'my_profile', infoUser, videosUser });
	}
	// [GET] /user/edit-profile
	async edit_profile(req, res) {
		const userId = req.cookies['userId'];
		const user = await getUserDetail(userId);
		res.render('edit_profile', { layout: 'edit_profile', user });
	}
	// [PUT] /user/edit-profile-process
	async edit_profile_process(req, res, next) {
		const formData = req.body;
		const userId =  req.cookies['userId'];
		formData.userId = req.cookies['userId'];
		const user = await getUserDetail(userId);
		if(req.files.avartar) {
			const img1 = req.files['avartar'][0]['path'];
			await cloudinary.uploader.upload( img1, {folder: 'user-details'})
				.then((avartar) => {
					formData.avartar = avartar.secure_url;
					formData.public_id_avartar = avartar.public_id;
				})
				.catch(next);
			if(user.public_id_avartar) {
				cloudinary.uploader.destroy(user.public_id_avartar);
			}
		} 
		if(req.files.background) {
			const img2 = req.files['background'][0]['path'];
			await cloudinary.uploader.upload( img2, {folder: 'user-details'})
				.then((background) => {
					formData.background = background.secure_url;
					formData.public_id_background = background.public_id;
				})
				.catch(next);
			if(user.public_id_background) {
				cloudinary.uploader.destroy(user.public_id_background);
			}
		}
		UserDetail.updateOne({ userId: userId}, formData)
			.then(() => res.redirect('/user/edit-profile'))
			.catch(next);
	}
	// [PUT] /user/change-password
	async change_password(req, res) {
		const formData = req.body;
		const userId = req.cookies['userId'];
		// find user
		const userObj = await getUser(userId);
		// check password currently
		const validPassword = await bcrypt.compare(formData['old-password'], userObj.password);
		if(validPassword) {
			// encode new password
			const salt = await bcrypt.genSalt(10);
			formData['new-password'] = await bcrypt.hash(formData['new-password'], salt);
			userObj.password = formData['new-password'];
			// update password in db
			User.updateOne({ _id: userId }, userObj)
				.then(() => res.redirect('/user/edit-profile'))
				.catch((error) => console.log(error));
		} else {
			res.redirect('/user');
		}
	}
	async delete_account(req, res) {
		const formData = req.body;
		const userId = req.cookies['userId'];
		// find user
		const userObj = await getUser(userId);
		// check password currently
		const validPassword = await bcrypt.compare(formData['delete-account'], userObj.password);
		if(validPassword) {
			await UserDetail.deleteOne({ userId: userId });
			await User.deleteOne({ _id: userId });
			await res.clearCookie('userId');
			res.redirect('/');
		} else {
			res.redirect('/user/edit-profile');
		}
	}
	// [GET] /user/upload-video
	upload_video(req, res) {
		res.render('upload_video', { layout: 'upload_video' });
	}
	// [POST] /user/create-video
	async create_video(req, res) {
		const formData = req.body;
		const userId = req.cookies['userId'];
		const imgVideo = req.file.path;
		formData.userId = userId;
		await cloudinary.uploader.upload(imgVideo, { folder: 'videos' })
			.then((video) => {
				formData.public_id_video = video.public_id;
				formData.thumbnail = video.secure_url;
			});
		const video = new Video(formData);
		video.save();
		res.redirect('/recipe/recipe-details');
	}
}

// get user
async function getUser(userId) {
	let user;
	await User.findOne({ userId: userId })
		.then((data) => {
			user = mongooseToOject(data);
		});
	return user;
}

// get user detail
async function getUserDetail(userId) {
	let userDetail;
	await UserDetail.findOne({ userId: userId })
		.then((data) => {
			userDetail = mongooseToOject(data);
		});
	return userDetail;
}
// get videos
async function getVideos(userId) {
	let videos;
	await Video.find({ userId: userId })
		.then((data) => {
			videos = mutipleMongooseToOject(data);
		});
	return videos;
}
// get retaurant detail
async function getRestaurantDetails(userId) {
	let restaurant;
	await Restaurant.findOne({ userId: userId })
		.then((data) => {
			restaurant = mongooseToOject(data);
		});
	return restaurant;
}
// get meal
async function getMeals(userId) {
	let meal;
	await Meal.findOne({ userId: userId })
		.then((data) => {
			meal = mongooseToOject(data);
		});
	return meal;
}

// get meal
async function getMealDetail(userId, slug) {
	let meal;
	await Meal.findOne({ userId: userId, slug: slug })
		.then((data) => {
			meal = mongooseToOject(data);
		});
	return meal;
}

module.exports = new UserController;
