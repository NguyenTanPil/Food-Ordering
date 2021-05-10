
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetail = new Schema({
  avartar: { type: String },
  background: { type: String },
  name: { type: String },
  location: { type: String},
  description: { type: String },
  emali: { type: String },
  phone: { type: String },
  userId: { type: String },
}, {
	timestamps: true,
});

module.exports = mongoose.model('UserDetail', UserDetail); // modelName, mySchema