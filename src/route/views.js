const express = require('express');
const router = express.Router();
const viewsController = require('../app/controllers/ViewController.js');

// config router 
router.get('/meals/:slug', viewsController.viewMeal);
router.get('/restaurants/:slug', viewsController.viewRestaurant);
router.get('/all-meals', viewsController.all_meals);
// recipes
router.get('/recipes', viewsController.recipes);
router.get('/recipes/:slug', viewsController.recipe_detail);
// partner
router.get('/partner', viewsController.partner);

module.exports = router;