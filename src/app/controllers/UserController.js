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
		await User.findOne({ userId: userId })
			.then((user) => {
				user = mongooseToOject(user);
				res.render('my_profile', { layout: 'my_profile', user });
			})
	}
	// [GET] /user/edit-profile
	edit_profile(req, res) {
		res.render('edit_profile', { layout: 'edit_profile' });
	}
	// [POST] /user/edit-profile-process
	edit_profile_process(req, res) {
		const formData = req.body;
		const img1 = req.files['avartar'][0]['path'];
		const img2 = req.files['background'][0]['path'];
		cloudinary.uploader.upload( img1, {folder: 'user-details'})
			.then((avartar) => avartar)
			.then((avartar) => {
				cloudinary.uploader.upload( img2, {folder: 'user-details'})
				.then((background) => {
					formData.avartar = avartar.secure_url;
					formData.background = background.secure_url;
					formData.userId = req.cookies['userId'];
					const userDetail = new UserDetail(formData);
					userDetail.save();
					res.redirect('/user/edit-profile');
				});
			});
	}
}

module.exports = new UserController;
