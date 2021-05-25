const recipeVideo = require('../models/RecipeVideo.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class RecipeController {

	// [GET] /recipe/recipe-details
	recipe_details(req, res) {
		try {
			res.render('recipe_details', { layout: 'recipe_details' });
		} catch(e) {
			next(err);
		}
	}
}

module.exports = new RecipeController;
