
class RecipeController {

	// [GET] /recipe
	index(req, res) {
		res.render('recipe', { layout: 'recipe' });
	}
	// [GET] /recipe/recipe-details
	recipe_details(req, res) {
		res.render('recipe_details', { layout: 'recipe_details' });
	}

}

module.exports = new RecipeController;
