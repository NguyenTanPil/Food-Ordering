// nhung meals hang cua user
const Restaurants = require('../../app/models/Restaurant.js');
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose.js');

class RestaurantsController {
	// [GET] /user/api/restaurants
	async fetchRestaurants(req, res) {
		const userId = req.cookies.userId;
		const restaurants = getRestaurants(userId);
		const restaurantsUser = await restaurants;
		res.json(restaurantsUser);
	}
	// [GET] /user/api/restaurants-view/:slug
	async fetchRestaurantView(req, res) {
		const restaurant = getRestaurantView(req.params.slug);
		const restaurantUser = await restaurant;
		res.json(restaurantUser);
	}
}

// function
async function getRestaurants(userId) {
	let restaurants;
	await Restaurants.find({ userId: userId })
		.then((data) => {
			restaurants = mutipleMongooseToOject(data);
		});
	return restaurants;
}
async function getRestaurantView(slug) {
	let restaurant;
	await Restaurants.findOne({ slug: slug })
		.then((data) => {
			restaurant = mongooseToOject(data);
		});
	return restaurant;
}
module.exports = new RestaurantsController;
