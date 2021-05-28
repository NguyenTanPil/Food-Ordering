
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentMeal = new Schema({
  mealSlug: { type: String },
  userId: { type: String },
  content: { type: String },
  userName: { type: String },
  avartar: { type: String },
  stars: { type: Number },
}, {
	timestamps: true,
});

module.exports = mongoose.model('CommentMeal', CommentMeal); // modelName, mySchema