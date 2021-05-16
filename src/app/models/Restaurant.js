
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurant = new Schema({
	logo: { type: String },
	public_id_logo: { type: String },
	name: { type: String },
	city: { type: String },
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
});

module.exports = mongoose.model('Restaurant', Restaurant);
