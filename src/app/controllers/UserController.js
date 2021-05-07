const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { mongooseToOject } = require('../../util/mongoose.js');

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
					maxAge: 1000 * 20
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
	// [GET] /my_profile
	my_profile(req, res) {
		res.render('my_profile', { layout: 'my_profile' });
	}
}

module.exports = new UserController;
