const express = require('express');
const router = express.Router();
const viewsController = require('../app/controllers/ViewController.js');

// config router
router.get('/meals/:slug', viewsController.viewMeal);
router.get('/restaurants/:slug', viewsController.viewRestaurant);

module.exports = router;