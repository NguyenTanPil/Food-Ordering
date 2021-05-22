// lay user detail
const User = require('../../app/models/UserDetail.js');
const { mongooseToOject } = require('../../util/mongoose.js');

class UserController {
	// [GET] /user/api/user-detail
	async fetchUser(req, res) {
		const userId = req.cookies.userId;
		const user = getUser(userId);
		const userDetail = await user;
		res.json(userDetail);
	}
}

// function
async function getUser(userId) {
	let user;
	await User.findOne({ userId: userId })
		.then((data) => {
			user = mongooseToOject(data);
		});
	return user;
}

module.exports = new UserController;
