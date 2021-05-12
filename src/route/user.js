const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const userController = require('../app/controllers/UserController.js');
const loginMiddleware =  require('../middlewares/login_mdw.js');

const uploadMulter = upload.fields([{ name: 'avartar', maxCount: 1 }, { name: 'background', maxCount: 1 }]);

// config router
router.get('/signup', userController.signup);
router.post('/create-user', userController.create_user);
router.get('/login', userController.login);
router.post('/login-process', userController.login_process);
router.get('/edit-profile' , loginMiddleware.requireLogin, userController.edit_profile);
router.put('/edit-profile-process', uploadMulter, userController.edit_profile_process);
router.put('/change-password', userController.change_password);
router.get('/', loginMiddleware.requireLogin, userController.my_profile);

module.exports = router;