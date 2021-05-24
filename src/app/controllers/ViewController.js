// nhung meals hang cua user
const Restaurants = require('../../app/models/Restaurant.js');
const { mongooseToOject } = require('../../util/mongoose.js');

class ViewsController {
	// [GET] /views/restaurants/:slug
	async viewMeal(req, res) {
		res.render('meal-detail', { layout: 'meal_detail_view' });
	}
	async viewRestaurant(req, res) {
		res.render('restaurant_detail_view', { layout: 'restaurant_detail_view' });
	}
}


module.exports = new ViewsController;
