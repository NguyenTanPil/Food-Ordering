
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderMeal = new Schema({
	userName: { type: String},
	userId: { type: String},
	location: { type: String},
	name: { type: String},
	mealId: { type: String},
	price: { type: Number},
	quantity: { type: Number},
	payment: { type: Number},
});

module.exports = mongoose.model('OrderMeal', OrderMeal);