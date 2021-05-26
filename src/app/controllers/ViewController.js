// nhung meals hang cua user
const Restaurants = require('../../app/models/Restaurant.js');
const recipeVideo = require('../../app/models/RecipeVideo.js');
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose.js');

class ViewsController {
	// [GET] /views/restaurants/:slug
	async viewMeal(req, res, next) {
		try {
			res.render('meal-detail', { layout: 'meal_detail_view' });
		} catch(e) {
			next(err);
		}
	}
	// [GET] /views/restaurants
	async viewRestaurant(req, res, next) {
		try {
			res.render('restaurant_detail_view', { layout: 'restaurant_detail_view' });
		} catch(e) {
			next(err);
		}
	}
	// [GET] /views/meals
	all_meals(req, res, next) {
		try {
			res.render('all_meals', { layout: 'all_meals' });
		} catch(e) {
			next(err);
		}
	}
	// [GET] /recipe
	recipes(req, res, next) {
		try {
			res.render('recipe', { layout: 'recipe' } );
		} catch(e) {
			next(err);
		}
	}
	// [GET] /views/recipe-detail
	recipe_detail(req, res) {
		try {
			res.render('recipe_details', { layout: 'recipe_detail_view' });
		} catch(e) {
			next(err);
		}
	}
	partner(req, res) {
		res.render('partner', { layout: 'partner' });
	}
}


module.exports = new ViewsController;
