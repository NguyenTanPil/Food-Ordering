
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'food-odering',
    api_key: '477487244417641',
    api_secret: '1KluvCVw995QAU1WeWXZG28DIwg',
});

module.exports = cloudinary;