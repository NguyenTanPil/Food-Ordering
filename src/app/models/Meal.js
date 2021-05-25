
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Meal = new Schema({
	name: { type: String },
	price: { type: Number },
	description: { type: String },
	selectMeal: { type: String },
	offerMeal: { type: String },
	cuisineMeal: { type: String },
	location: { type: String },
	photos: { type: [String] },
	public_id_photos: { type: [String] },
	userId: { type: String },
	slugRestaurant: { type: String },
	complelted: { type: Boolean },
	slug: { type: String, slug: "name", unique: true },
});

module.exports = mongoose.model('Meal', Meal);
