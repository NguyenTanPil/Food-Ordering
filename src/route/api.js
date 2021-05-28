
const express = require('express');
const router = express.Router();

const orderMeals = require('../api/controller/OrderMealsController.js');
const meals = require('../api/controller/MealsController.js');
const restaurants = require('../api/controller/RestaurantsController.js');
const restaurant = require('../api/controller/RestaurantController.js');
const videos = require('../api/controller/VideosController.js');
const user = require('../api/controller/UserController.js');
const comments = require('../api/controller/CommetMealController.js');

// user
router.get('/user-detail', user.fetchUser);
router.get('/user-detail/:slug', user.fetchUserView);

// order meals of user
router.delete('/order-meals/:slug', orderMeals.deleteOrderMeals);
router.patch('/order-meals/:slug', orderMeals.updateOrderMeals);
router.get('/order-meals', orderMeals.fetchOrderMeals);

// meals of user
router.get('/meals', meals.fetchMeals);
router.get('/meals/:slug', meals.fetchMealDetail);
router.get('/meals-view', meals.fetchMealsView);
router.get('/meals/meal-detail/:slug', meals.fetchMealDetailView);
router.get('/restaurants/:slug/meals-view', meals.fetchMealsByRest);

// restaurant of user
router.get('/restaurants', restaurants.fetchRestaurants);
router.get('/restaurants-view', restaurants.fetchRestaurantsView);
router.get('/restaurants-view/:slug', restaurants.fetchRestaurantView);

// restaurant detail of user
router.get('/restaurant-detail/:slug', restaurant.fetchRestaurant);

// video of user 
router.get('/videos', videos.fetchVideos);
router.get('/videos/:slug', videos.fetchVideoDetail);
// video of view
router.get('/videos-view', videos.fetchVideosView);
router.get('/videos-view/:slug', videos.fetchVideoDetailView);
router.patch('/videos-view/:slug', videos.updateVideoDetailView);
// post comment
router.post('/recipes/:slug', comments.postComment); 
router.get('/recipes/:slug/comments', comments.fetchComments); 

module.exports = router;