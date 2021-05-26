const express = require('express');
const router = express.Router();
const partnerController = require('../app/controllers/PartnerController.js');
// config router
router.get('/', partnerController.index);

module.exports = router;