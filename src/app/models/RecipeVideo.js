
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeVideo = new Schema({
  image: { type: String },
  views: { type: String },
  name: { type: String },
  description: { type: String },
  date: { type: String },
  stars: { type: String },
  comment: { type: String },
});

module.exports = mongoose.model('RecipeVideo', RecipeVideo);
