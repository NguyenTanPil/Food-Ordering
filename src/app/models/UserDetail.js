
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultAvartar = 'https://res.cloudinary.com/food-odering/image/upload/v1620744647/user-details/avt_npasta.png';
const defaultBackground = 'https://res.cloudinary.com/food-odering/image/upload/v1620744647/user-details/backgroundjpg_knsmfc.jpg';

const UserDetail = new Schema({
  avartar: { type: String, default: defaultAvartar },
  background: { type: String, default: defaultBackground },
  name: { type: String, default: 'User Name' },
  location: { type: String, default: 'Location'},
  description: { type: String },
  email: { type: String },
  phone: { type: String },
  userId: { type: String },
}, {
	timestamps: true,
});

module.exports = mongoose.model('UserDetail', UserDetail); // modelName, mySchema