
const express = require('express');
const router = express.Router();
const orderMeals = require('../api/controller/OrderMealsController.js');
const meals = require('../api/controller/MealsController.js');
const restaurants = require('../api/controller/RestaurantsController.js');
const videos = require('../api/controller/VideosController.js');

// order meals of user
router.delete('/order-meals/:slug', orderMeals.deleteOrderMeals);
router.patch('/order-meals/:slug', orderMeals.updateOrderMeals);
router.get('/order-meals', orderMeals.fetchOrderMeals);

// meals of user
router.get('/meals', meals.fetchMeals);

// restaurant of user
router.get('/restaurants', restaurants.fetchRestaurants);

// video of user 
router.get('/videos', videos.fetchVideos);

module.exports = router;