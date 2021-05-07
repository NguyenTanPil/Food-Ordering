const recipeVideo = require('../models/RecipeVideo.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class RecipeController {

	// [GET] /recipe
	index(req, res, next) {
		recipeVideo.find({})
			.then(recipeVideos => {
				recipeVideos = mutipleMongooseToOject(recipeVideos);
				res.render('recipe', { layout: 'recipe', recipeVideos } );
			})
			.catch(next);
	}
	// [GET] /recipe/recipe-details
	recipe_details(req, res) {
		res.render('recipe_details', { layout: 'recipe_details' });
	}

}

module.exports = new RecipeController;
