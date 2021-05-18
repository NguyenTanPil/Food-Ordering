
const express = require('express');
const router = express.Router();
const restaurantController = require('../app/controllers/RestaurantController.js');
const loginMiddleware =  require('../middlewares/login_mdw.js');
const upload =  require('../middlewares/multer.js');

router.get('/add-restaurant', loginMiddleware.requireLogin, restaurantController.add_restaurant);
router.post('/create-restaurant', loginMiddleware.requireLogin, restaurantController.create_restaurant);
router.put('/update-restaurant', loginMiddleware.requireLogin, upload.single('logo'), restaurantController.update_restaurant);
router.post('/create-meal', upload.array('photos', 10), loginMiddleware.requireLogin, restaurantController.create_meal);
router.get('/', loginMiddleware.requireLogin, restaurantController.restaurant_detail);

module.exports = router;
