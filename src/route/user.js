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
router.put('/edit-profile-process', uploadAvtBack, userController.edit_profile_process);
router.put('/change-password', userController.change_password);
router.delete('/delete-account', userController.delete_account);


router.get('/upload-video', userController.upload_video);
router.post('/create-video', upload.single('thumbnail'), userController.create_video);

router.get('/', loginMiddleware.requireLogin, userController.my_profile);

module.exports = router;