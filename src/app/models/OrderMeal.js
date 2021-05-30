

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderMeal = new Schema({
	userName: { type: String},
	userId: { type: String},
	location: { type: String},
	name: { type: String},
	mealId: { type: String},
	sellerId: { type: String},
	slugRestaurant: { type: String},
	sellerRest: { type: String},
	mealImg: { type: String},
	price: { type: Number},
	quantity: { type: Number},
	payment: { type: Number},
	payment: { type: Number},
	completed: { type: String},
	deleted: { type: String},
	userDeleted: { type: String},
}, {
	timestamps: true,
});

module.exports = mongoose.model('OrderMeal', OrderMeal);