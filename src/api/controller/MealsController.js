// nhung meals hang cua user
const Meals = require('../../app/models/Meal.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class MealController {
	// [GET] /user/api/meals
	async fetchMeals(req, res) {
		const userId = req.cookies.userId;
		const meals = getMeals(userId);
		const mealsUser = await meals;
		res.json(mealsUser);
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

module.exports = new MealController;
