const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const UserDetail = require('../models/UserDetail.js'); 
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { mongooseToOject } = require('../../util/mongoose.js');

cloudinary.config({
    cloud_name: 'food-odering',
    api_key: '477487244417641',
    api_secret: '1KluvCVw995QAU1WeWXZG28DIwg',
});

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
	edit_profile_process(req, res) {
		const formData = req.body;
		const userId =  req.cookies['userId'];
		let img1, img2;
		try {
			img1 = req.files['avartar'][0]['path'];
			img2 = req.files['background'][0]['path'];
			cloudinary.uploader.upload( img1, {folder: 'user-details'})
			.then((avartar) => avartar)
			.then((avartar) => {
				cloudinary.uploader.upload( img2, {folder: 'user-details'})
				.then((background) => {
					formData.avartar = avartar.secure_url;
					formData.background = background.secure_url;
					formData.userId = req.cookies['userId'];
					// res.json(formData);
					UserDetail.updateOne({ userId: userId}, formData)
						.then(() => res.redirect('/user/edit-profile'))
						.catch(() => res.json("Khong thanh cong"));
				});
			});
		} catch(e) {
			formData.userId = req.cookies['userId'];
			UserDetail.updateOne({ userId: userId}, formData)
				.then(() => res.redirect('/user/edit-profile'))
				.catch(() => res.json("Khong thanh cong"));
		}
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
				.catch(() => res.json("That bai"));
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
		await UserDetail.deleteOne({ userId: userId });
		await User.deleteOne({ _id: userId });
		await res.clearCookie('userId');
		res.redirect('/');
	}
}

module.exports = new UserController;
