const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');

// config router
router.get('/browse-place', siteController.browse_place);
router.get('/partner-with-us', siteController.partner_with_us);
router.get('/about-us', siteController.about_us);
router.get('/orders', siteController.orders);
router.get('/error', siteController.error);
router.get('/', siteController.index);

module.exports = router;