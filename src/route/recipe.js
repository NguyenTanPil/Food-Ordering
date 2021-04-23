const express = require('express');
const router = express.Router();
const recipeController = require('../app/controllers/RecipeController.js');
// config router
router.get('/recipe-details', recipeController.recipe_details);
router.get('/', recipeController.index);

module.exports = router;