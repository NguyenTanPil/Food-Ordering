
const express = require('express');
const router = express.Router();
const mealController = require('../app/controllers/MealController.js');
const loginMiddleware =  require('../middlewares/login_mdw.js');
const upload =  require('../middlewares/multer.js');

router.get('/:slug', loginMiddleware.requireLogin, mealController.meal_detail);
router.post('/:slug/order-meal', mealController.order_meal);

module.exports = router;
