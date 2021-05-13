const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const UserDetail = require('../models/UserDetail.js'); 
const streamifier = require('streamifier');
const { mongooseToOject } = require('../../util/mongoose.js');
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
				body.userId = user._id;
				body.name = user.name;
				const userDetail = new UserDetail(body);
				userDetail.save();
				res.redirect('/user');
				// res.render('my_profile', { layout: 'my_profile', user });
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
		await UserDetail.findOne({ userId: userId })
			.then((user) => {
				user = mongooseToOject(user);
				res.render('my_profile', { layout: 'my_profile', user });
			})
	}
	// [GET] /user/edit-profile
	async edit_profile(req, res) {
		const userId = req.cookies['userId'];
		await UserDetail.findOne({ userId: userId })
			.then((user) => {
				user = mongooseToOject(user);
				res.render('edit_profile', { layout: 'edit_profile', user });
			})
	}
	// [PUT] /user/edit-profile-process
	async edit_profile_process(req, res) {
		const formData = req.body;
		const userId =  req.cookies['userId'];
		formData.userId = req.cookies['userId'];
		const defaultAvartar = 'https://res.cloudinary.com/food-odering/image/upload/v1620744647/user-details/avt_npasta.png';
		const defaultBackground = 'https://res.cloudinary.com/food-odering/image/upload/v1620744647/user-details/backgroundjpg_knsmfc.jpg';
		let img1, img2;
		let user = await UserDetail.findOne({ userId: userId });
		user = mongooseToOject(user);
		if(req.files.avartar) {
			img1 = req.files['avartar'][0]['path'];
		} else {
			img1 = defaultAvartar;
		}
		if(req.files.background) {
			img2 = req.files['background'][0]['path'];
		} else {
			img2 = defaultBackground;
		}
		await cloudinary.uploader.upload( img1, {folder: 'user-details'})
			.then((avartar) => {
				formData.avartar = avartar.secure_url;
				formData.public_id_avartar = avartar.public_id;
			})
			.catch(err => console.log(err));
		await cloudinary.uploader.upload( img2, {folder: 'user-details'})
			.then((background) => {
				formData.background = background.secure_url;
				formData.public_id_background = background.public_id;
			})
			.catch(err => console.log(err));
		if(user.public_id_avartar) {
			await cloudinary.uploader.destroy(user.public_id_avartar);
		}
		if(user.public_id_background) {
			await cloudinary.uploader.destroy(user.public_id_background);
		}
		UserDetail.updateOne({ userId: userId}, formData)
			.then(() => res.redirect('/user/edit-profile'))
			.catch((error) => console.log(error));
	}
	// [PUT] /user/change-password
	async change_password(req, res) {
		const formData = req.body;
		const userId = req.cookies['userId'];
		// find user
		let userDb = await User.findOne({ _id: userId });
		let userObj = mongooseToOject(userDb);
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
		let userDb = await User.findOne({ _id: userId });
		let userObj = mongooseToOject(userDb);
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
}

module.exports = new UserController;
