// nhung meals hang cua user
const Restaurant = require('../../app/models/Restaurant.js');
const { mongooseToOject } = require('../../util/mongoose.js');

class RestaurantController {
	// [GET] /user/api/restaurant-detail/:slug
	async fetchRestaurant(req, res) {
		const userId = req.cookies.userId;
		const restaurant = getRestaurant(userId, req.params.slug);
		const restaurantUser = await restaurant;
		res.json(restaurantUser);
	}
}

// function
async function getRestaurant(userId, slug) {
	let restaurant;
	await Restaurant.findOne({ userId: userId, slug: slug })
		.then((data) => {
			restaurant = mongooseToOject(data);
		});
	return restaurant;
}

module.exports = new RestaurantController;
