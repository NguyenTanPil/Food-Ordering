
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Video = new Schema({
  title: { type: String },
  description: { type: String },
  tags: { type: String },
  link: { type: String },
  thumbnail: { type: String },
  stars: { type: Number, default: 0 },
  public_id_video: { type: String },
  userId: { type: String },
  slug: { type: String, slug: "title", unique: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Video', Video); // modelName, mySchema