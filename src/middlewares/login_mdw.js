const User = require('../app/models/User.js');

function requireLogin(req, res, next) {
	if(req.cookies.userId == undefined) {
		res.redirect('/user/login');
		return;
	}
	let user = User.findOne({ _id: req.cookies.userId });
	if(!user) {
		res.redirect('/user/login');
		return;
	}
	next();
}

module.exports = { requireLogin };