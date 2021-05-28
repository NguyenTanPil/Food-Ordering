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
	// [GET] /user/api/meals/meal-detail/:slug
	async fetchMealDetailView(req, res) {
		const slug = req.params.slug;
		const mealDetail = getMealDetailView(slug);
		const mealDetailUser = await mealDetail;
		res.json(mealDetailUser);
	}
	// [GET] /user/api/meals-view
	async fetchMealsView(req, res) {
		const meals = getMealsView();
		const mealsUser = await meals;
		res.json(mealsUser);
	}
	// [GET] /user/api/retaurants/:slug/meals
	async fetchMealsByRest(req, res) {
		const meals = getMealsByRestaurant(req.params.slug);
		const mealsUser = await meals;
		res.json(mealsUser);
	}
	// [UPDATE] /user/api/meals-view/:slug
	async updateMealDetailView(req, res) {
		Meals.updateOne({slug: req.params.slug}, req.body)
			.then(() => console.log('Thanh cong'))
			.catch(() => console.log('Khong thanh cong'))
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

async function getMealsView() {
	let meal;
	await Meals.find({})
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

async function getMealDetailView(slug) {
	let mealDetail;
	await Meals.findOne({ slug: slug })
		.then((data) => {
			mealDetail = mongooseToOject(data);
		});
	return mealDetail;
}

async function getMealsByRestaurant(slug) {
	let meals;
	await Meals.find({ slugRestaurant: slug })
		.then((data) => {
			meals = mutipleMongooseToOject(data);
		});
	return meals;
}

module.exports = new MealController;
