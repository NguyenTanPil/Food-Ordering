
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
		try {
			res.render('add_restaurant', { layout: 'add_restaurant' });
		} catch(e) {
			next(err);
		}
	}
	// [POST] /user/restaurant/create-restaurant
	create_restaurant(req, res, next) {
		const formData = req.body;
		const userId = req.cookies['userId'];
		formData.userId = userId;
		const restaurant = new Restaurant(formData);
		restaurant.save()
			.then((data) => {
				if(!data) {
					return res.status(404).end();
				} else {
					return res.status(200).redirect('/user');
				}
			})
			.catch(err => next(err));
	}
	// [GET] /user/restaurant/:slug
	async restaurant_detail(req, res, next) {
		const userId = req.cookies['userId'];
		const restaurant = await getRestaurantDetails(userId, req.params.slug);
		if(!restaurant) {
			res.status(404).redirect('/error');
			return;
		}
		try {
			res.render('restaurant_detail', { layout: 'restaurant_detail' });
		} catch(e) {
			next(err);
		}
	}
	// [PUT] /user/restaurant/update-restaurant
	async update_restaurant(req, res, next) {
		const userId = req.cookies['userId'];
		const restaurant = await getRestaurantDetails(userId, req.params.slug);
		const restaurantUser =  await restaurant;
		let formData = req.body;
		const files = req.files;
		let clLogo, clPhotos, photo;
		formData.photos = [];
		formData.public_id_photos = [];
		if(files.logo) {
			const logo = files.logo[0].path;
			clLogo = cloudinary.uploader.upload(logo, { folder: 'restaurants' })
				.then(data => data)
				.catch(next);
			const uploadLogo = await clLogo;
			formData.logo = uploadLogo.secure_url;
			formData.public_id_logo = uploadLogo.public_id;
		}
		if(files.photos) {
			for(let i = 0; i < files.photos.length; i++) {
				photo =  files.photos[i].path;
				clPhotos = cloudinary.uploader.upload(photo, { folder: 'restaurants' })
					.then(data => data)
					.catch(next);
				const uploadPhotos = await clPhotos;
				formData.photos[i] = uploadPhotos.secure_url;
				formData.public_id_photos[i] = uploadPhotos.public_id;
			}
		}
		Restaurant.updateOne({ slug: req.params.slug }, formData)
			.then((data) => {
				if(!data) {
					return res.status(404).end();
				} else {
					return res.status(200).redirect(`/user/restaurant/${req.params.slug}`);
				}
			})
			.catch(err => next(err));
	}
	// [POST] /user/restaurant/create-meal
	async create_meal(req, res, next) {
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
		meal.save()
		.then((data) => {
				if(!data) {
					return res.status(404).end();
				} else {
					return res.status(200).redirect(`/user/restaurant/${formData.slugRestaurant}`);
				}
			})
			.catch(err => next(err));
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
async function getRestaurantDetails(userId, slug) {
	let restaurant;
	await Restaurant.findOne({ userId: userId, slug: slug })
		.then((data) => {
			restaurant = mongooseToOject(data);
		})
	return restaurant;
}
// get meals
async function getMeals(userId, slugRestaurant) {
	let meal;
	await Meal.find({ userId: userId, slugRestaurant: slugRestaurant })
		.then((data) => {
			meal = mutipleMongooseToOject(data);
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
