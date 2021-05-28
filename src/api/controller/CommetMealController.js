
const CommentMeal = require('../../app/models/CommentMeal.js');
const User = require('../../app/models/UserDetail.js');
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose.js');

class CommentMealController {
	// [POST] /views/recipes/:slug/
	async postComment(req, res, next) {
		const userId = req.cookies.userId;
		const formData = req.body;
		const user = await getUserById(userId);
		formData.userId = userId;
		formData.userName = user.name;
		formData.avartar = user.avartar;
		const commentMeal = new CommentMeal(formData);
		commentMeal.save();
	}
	// [GET] /views/recipes/:slug/comment
	async fetchComments(req, res, next) {
		const comments = getCommentsMeal(req.params.slug);
		const commentsMeal = await comments;
		res.json(commentsMeal);
	}
}

// function
async function getCommentsMeal(slug) {
	let comment;
	await CommentMeal.find({ mealSlug: slug })
		.then((data) => {
			comment = mutipleMongooseToOject(data);
		});
	return comment;
}

async function getUserById(id) {
	let user;
	await User.findOne({ userId: id })
		.then((data) => {
			user = mongooseToOject(data);
		});
	return user;
}

module.exports = new CommentMealController;
