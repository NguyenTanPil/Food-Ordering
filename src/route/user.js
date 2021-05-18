
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController.js');
const loginMiddleware =  require('../middlewares/login_mdw.js');
const upload =  require('../middlewares/multer.js');

// upload images
const uploadAvtBack = upload.fields([{ name: 'avartar' }, { name: 'background' }]);

// config router
router.get('/signup', userController.signup);
router.post('/create-user', userController.create_user);
router.get('/login', userController.login);
router.post('/login-process', userController.login_process);

router.get('/edit-profile' , loginMiddleware.requireLogin, userController.edit_profile);
router.put('/edit-profile-process', uploadAvtBack, loginMiddleware.requireLogin, userController.edit_profile_process);
router.put('/change-password', loginMiddleware.requireLogin, userController.change_password);
router.delete('/delete-account', loginMiddleware.requireLogin, userController.delete_account);


router.get('/upload-video', loginMiddleware.requireLogin, userController.upload_video);
router.post('/create-video', loginMiddleware.requireLogin, upload.single('thumbnail'), userController.create_video);

router.get('/add-restaurant', loginMiddleware.requireLogin, userController.add_restaurant);
router.post('/create-restaurant', loginMiddleware.requireLogin, userController.create_restaurant);
router.get('/restaurant-detail', loginMiddleware.requireLogin, userController.restaurant_detail);
router.put('/update-restaurant', loginMiddleware.requireLogin, upload.single('logo'), userController.update_restaurant);
router.post('/create-meal', upload.array('photos', 10), loginMiddleware.requireLogin, userController.create_meal);
router.get('/meal-detail/:slug', userController.meal_detail);


router.get('/', loginMiddleware.requireLogin, userController.my_profile);

module.exports = router;