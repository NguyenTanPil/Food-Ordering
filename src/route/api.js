
const express = require('express');
const router = express.Router();
const orderMeals = require('../api/controller/OrderMealsController.js');
const meals = require('../api/controller/MealsController.js');
const restaurants = require('../api/controller/RestaurantsController.js');
const restaurant = require('../api/controller/RestaurantController.js');
const videos = require('../api/controller/VideosController.js');
const user = require('../api/controller/UserController.js');

// user
router.get('/user-detail', user.fetchUser);

// order meals of user
router.delete('/order-meals/:slug', orderMeals.deleteOrderMeals);
router.patch('/order-meals/:slug', orderMeals.updateOrderMeals);
router.get('/order-meals', orderMeals.fetchOrderMeals);

// meals of user
router.get('/meals', meals.fetchMeals);
router.get('/meals/:slug', meals.fetchMealDetail);

// restaurant of user
router.get('/restaurants', restaurants.fetchRestaurants);

// restaurant detail of user
router.get('/restaurant-detail/:slug', restaurant.fetchRestaurant);

// video of user 
router.get('/videos', videos.fetchVideos);
router.get('/videos/:slug', videos.fetchVideoDetail);

module.exports = router;