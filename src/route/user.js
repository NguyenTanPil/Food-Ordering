const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController.js');
const loginMiddleware =  require('../middlewares/login_mdw.js');

// config router
router.get('/signup', userController.signup);
router.post('/create-user', userController.create_user);
router.get('/login', userController.login);
router.post('/login-process', userController.login_process);
router.get('/edit-profile', userController.edit_profile);
router.get('/', loginMiddleware.requireLogin, userController.my_profile);

module.exports = router;