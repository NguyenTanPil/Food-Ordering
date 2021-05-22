
// const User = require('../models/User.js');
const UserDetail = require('../models/UserDetail.js');
// const Video = require('../models/Video.js');
const Restaurant = require('../models/Restaurant.js');
const Meal = require('../models/Meal.js');
const OrderMeal = require('../models/OrderMeal.js');
const { mutipleMongooseToOject, mongooseToOject } = require('../../util/mongoose.js');
// const cloudinary = require('../../middlewares/cloudinary_config.js');

class MealController {

	// [GET] /user/restaurant/:slug/meal/:slug
	async meal_detail(req, res) {
		const userId = req.cookies['userId'];
		const slug = req.params.slug;
		const mealUser = getMealDetail(userId, slug);
		const meal = await mealUser;
		if(!meal) {
			res.status(404).redirect('/error');
			return;
		}
		const checkUrl = req.originalUrl.indexOf(meal.slugRestaurant);
		if(checkUrl == -1) {
			res.status(404).redirect('/error');
			return;
		}
		res.render('meal-detail', { layout: 'meal-detail' });
	}
	// [POST] /user/restaurant/:slug/meal/:slug/order-meal
	async order_meal(req, res) {
		const formData = req.body;
		const mealUser = getMealDetailById(formData.mealId);
		const meal = await mealUser;
		formData.sellerId = meal.userId;
		formData.completed = false;
		formData.deleted = false;
		formData.userDeleted = false;
		const orderMeal = new OrderMeal(formData);
		orderMeal.save();
		res.redirect('/user');
	}
}

// // get user
// async function getUser(userId) {
// 	let user;
// 	await User.findOne({ userId: userId })
// 		.then((data) => {
// 			user = mongooseToOject(data);
// 		});
// 	return user;
// }

// // get user detail
async function getUserDetail(userId) {
	let userDetail;
	await UserDetail.findOne({ userId: userId })
		.then((data) => {
			userDetail = mongooseToOject(data);
		});
	return userDetail;
}
// // get videos
// async function getVideos(userId) {
// 	let videos;
// 	await Video.find({ userId: userId })
// 		.then((data) => {
// 			videos = mutipleMongooseToOject(data);
// 		});
// 	return videos;
// }
// // get retaurant detail
async function getRestaurantDetails(userId, slug) {
	let restaurant;
	await Restaurant.findOne({ userId: userId, slug: slug })
		.then((data) => {
			restaurant = mongooseToOject(data);
		})
	return restaurant;
}
// // get meal
// async function getMeals(userId) {
// 	let meal;
// 	await Meal.findOne({ userId: userId })
// 		.then((data) => {
// 			meal = mongooseToOject(data);
// 		});
// 	return meal;
// }

// get meal
async function getMealDetail(userId, slug) {
	let meal;
	await Meal.findOne({ userId: userId, slug: slug })
		.then((data) => {
			meal = mongooseToOject(data);
		});
	return meal;
}
// get meal by id
async function getMealDetailById(id) {
	let meal;
	await Meal.findOne({ _id: id })
		.then((data) => {
			meal = mongooseToOject(data);
		});
	return meal;
}

module.exports = new MealController;
