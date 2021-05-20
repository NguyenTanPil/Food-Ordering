
const express = require('express');
const router = express.Router();
const restaurantController = require('../app/controllers/RestaurantController.js');
const loginMiddleware =  require('../middlewares/login_mdw.js');
const upload =  require('../middlewares/multer.js');
const uploadRestaurant = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'photos', maxCount: 10 }]);

router.get('/add-restaurant', loginMiddleware.requireLogin, restaurantController.add_restaurant);
router.post('/create-restaurant', loginMiddleware.requireLogin, restaurantController.create_restaurant);
router.put('/update-restaurant/:slug', loginMiddleware.requireLogin, uploadRestaurant, restaurantController.update_restaurant);
router.post('/create-meal', upload.array('photos', 10), loginMiddleware.requireLogin, restaurantController.create_meal);
router.get('/:slug', loginMiddleware.requireLogin, restaurantController.restaurant_detail);

module.exports = router;
