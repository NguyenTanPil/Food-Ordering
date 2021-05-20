const User = require('../app/models/User.js');

function requireLogin(req, res, next) {
	// net set cookie
	if(req.cookies.userId == undefined) {
		res.redirect('/user/login');
		return;
	}
	// checking user
	const user = User.findOne({ _id: req.cookies.userId });
	if(!user) {
		res.redirect('/user/login');
		return;
	}
	next();
}

module.exports = { requireLogin };