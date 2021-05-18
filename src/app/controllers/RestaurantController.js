
const User = require('../models/User.js');
const UserDetail = require('../models/UserDetail.js');
const Video = require('../models/Video.js');
const Restaurant = require('../models/Restaurant.js');
const Meal = require('../models/Meal.js');
const { mutipleMongooseToOject, mongooseToOject } = require('../../util/mongoose.js');
const cloudinary = require('../../middlewares/cloudinary_config.js');

class RestaurantController {
	// [GET] /user/restaurant/add-restaurant
	add_restaurant(req, res) {
		res.render('add_restaurant', { layout: 'add_restaurant' });
	}
	// [POST] /user/restaurant/create-restaurant
	create_restaurant(req, res) {
		const formData = req.body;
		const userId = req.cookies['userId'];
		formData.userId = userId;
		res.json(formData);
		const restaurant = new Restaurant(formData);
		restaurant.save();
		res.redirect('/partner/restaurant-detail-view');
	}
	// [GET] /user/restaurant/restaurant-detail
	async restaurant_detail(req, res) {
		const userId = req.cookies['userId'];
		const infoUser = await getUserDetail(userId);
		const videosUser = await getVideos(userId);
		const restaurant = await getRestaurantDetails(userId);
		const meal = await getMeals(userId);
		res.render('restaurant_detail', { layout: 'restaurant_detail', infoUser, videosUser, restaurant, meal });
	}
	// [PUT] /user/restaurant/update-restaurant
	async update_restaurant(req, res) {
		const userId = req.cookies['userId'];
		const restaurant = await getRestaurantDetails(userId);
		let formData = req.body;
		const logoRestaurant = req.file.path;
		await cloudinary.uploader.upload(logoRestaurant, { folder: 'restaurants' })
			.then(logo => {
				formData.public_id_logo = logo.public_id;
				formData.logo = logo.secure_url;
			});
		Restaurant.updateOne({ userId: userId }, formData)
			.then(() => res.redirect('/user/restaurant-detail'))
			.catch((error) => console.log(error));
	}
	// [POST] /user/restaurant/create-meal
	async create_meal(req, res) {
		let formData = req.body;
		const userId = req.cookies['userId'];
		formData.userId = userId;
		formData.photos = [];
		formData.public_id_photos = [];
		for(let i = 0; i < req.files.length; i++) {
			await cloudinary.uploader.upload(req.files[i].path, { folder: 'meals' })
				.then(data => {
					formData.public_id_photos.push(data.public_id);
					formData.photos.push(data.secure_url);
				});
		}
		const meal = new Meal(formData);
		meal.save();
		res.redirect('/user/restaurant-detail');
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

module.exports = new RestaurantController;
