// nhung meals hang cua user
const Restaurants = require('../../app/models/Restaurant.js');
const recipeVideo = require('../../app/models/RecipeVideo.js');
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose.js');

class ViewsController {
	// [GET] /views/restaurants/:slug
	async viewMeal(req, res) {
		res.render('meal-detail', { layout: 'meal_detail_view' });
	}
	// [GET] /views/restaurants
	async viewRestaurant(req, res) {
		res.render('restaurant_detail_view', { layout: 'restaurant_detail_view' });
	}
	// [GET] /views/meals
	all_meals(req, res) {
		res.render('all_meals', { layout: 'all_meals' });
	}
	// [GET] /recipe
	recipes(req, res, next) {
		recipeVideo.find({})
			.then(recipeVideos => {
				recipeVideos = mutipleMongooseToOject(recipeVideos);
				res.render('recipe', { layout: 'recipe', recipeVideos } );
			})
			.catch(next);
	}
	// [GET] /views/recipe-detail
	recipe_detail(req, res) {
		res.render('recipe_details', { layout: 'recipe_detail_view' });
	}
}


module.exports = new ViewsController;
