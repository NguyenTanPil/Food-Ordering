// nhung meals hang cua user
const Restaurants = require('../../app/models/Restaurant.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class RestaurantsController {
	// [GET] /user/api/restaurants
	async fetchRestaurants(req, res) {
		const userId = req.cookies.userId;
		const restaurants = getRestaurants(userId);
		const restaurantsUser = await restaurants;
		res.json(restaurantsUser);
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

module.exports = new RestaurantsController;
