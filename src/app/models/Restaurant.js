
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const defaultLogo = 'https://res.cloudinary.com/food-odering/image/upload/v1621168920/restaurants/ivmrfwer2hs21ogfuu51.jpg';
const defaultPublicIdLogo = 'restaurants/ivmrfwer2hs21ogfuu51';

const Restaurant = new Schema({
	logo: { type: String, default: defaultLogo },
	photos: { type: [String] },
	public_id_logo: { type: String, default: defaultPublicIdLogo },
	public_id_photos: { type: [String] },
	name: { type: String },
	city: { type: String },
	stars: { type: Number },
	position: { type: String },
	email: { type: String },
	phoneNumber: { type: String },
	phoneRestaurant: { type: String },
	website: { type: String },
	open: { type: String },
	days: { type: [String] },
	openHour: { type: String },
	closeHour: { type: String },
	address: { type: String },
	services: { type: [String] },
	alcohol: { type: String },
	seating: { type: String },
	cuisine: { type: String },
	tag: { type: String },
	payment: { type: String },
	userId: { type: String },
	slug: { type: String, slug: "name", unique: true },
}, {
	timestamps: true,
});

module.exports = mongoose.model('Restaurant', Restaurant);
