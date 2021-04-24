const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect('mongodb://localhost:27017/food_ordering', {
		  useNewUrlParser: true,
		  useUnifiedTopology: true,
		  useFindAndModify: false,
		  useCreateIndex: true
		});
		console.log('Connect Successfully');
	} catch(e) {
		console.log('Connect fail');
	}	
}

module.exports = { connect };