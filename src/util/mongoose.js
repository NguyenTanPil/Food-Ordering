module.exports = {
	mutipleMongooseToOject: (mongooses) => {
		return mongooses.map(mongoose => mongoose.toObject());
	},
	mongooseToOject: (mongoose) => {
		return mongoose ? mongoose.toObject() : mongoose;
	}
}