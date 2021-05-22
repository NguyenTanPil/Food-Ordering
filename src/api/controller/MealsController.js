// nhung meals hang cua user
const Meals = require('../../app/models/Meal.js');
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose.js');

class MealController {
	// [GET] /user/api/meals
	async fetchMeals(req, res) {
		const userId = req.cookies.userId;
		const meals = getMeals(userId);
		const mealsUser = await meals;
		res.json(mealsUser);
	}
	// [GET] /user/api/meals/:slug
	async fetchMealDetail(req, res) {
		const userId = req.cookies.userId;
		const slug = req.params.slug;
		const mealDetail = getMealDetail(userId, slug);
		const mealDetailUser = await mealDetail;
		res.json(mealDetailUser);
	}
}

// function
async function getMeals(userId) {
	let meal;
	await Meals.find({ userId: userId })
		.then((data) => {
			meal = mutipleMongooseToOject(data);
		});
	return meal;
}

async function getMealDetail(userId, slug) {
	let mealDetail;
	await Meals.findOne({ userId: userId, slug: slug })
		.then((data) => {
			mealDetail = mongooseToOject(data);
		});
	return mealDetail;
}

module.exports = new MealController;
