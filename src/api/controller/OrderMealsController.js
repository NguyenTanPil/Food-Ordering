// nhung don dat hang cua user
const OrderMeals = require('../../app/models/OrderMeal.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class OrderMealController {
	// [GET] /user/api/:slugRest/order-meals
	async fetchOrderMeals(req, res) {
		const orderMeals = getOrderMeals(req.params.slug);
		const orderMealsUser = await orderMeals;
		res.json(orderMealsUser);
	} 
	// [GET] /user/api/order-meals
	async fetchAllOrderMeals(req, res) {
		const userId = req.cookies.userId;
		const orderMeals = getAllOrderMeals(userId);
		const orderMealsUser = await orderMeals;
		res.json(orderMealsUser);
	} 
	// [PATCH] /user/api/order-meals/:slug
	async updateOrderMeals(req, res, next) {
		OrderMeals.updateOne({ _id: req.params.slug }, req.body)
			.then((data) => {
				if(!data) {
					return res.status(404).end();
				} return res.status(200).json(data);
			})
			.catch(error => next(error));
	}
	// [DELETE] /user/api/order-meals/:slug
	async deleteOrderMeals(req, res) {
		OrderMeals.updateOne({ _id: req.params.slug })
			.then((data) => {
				if(!data) {
					return res.status(404).end();
				} return res.status(200).json(data);
			})
			.catch(error => next(error));
	}
}

// function
async function getOrderMeals(slug) {
	let meal;
	await OrderMeals.find({ slugRestaurant: slug })
		.then((data) => {
			meal = mutipleMongooseToOject(data);
		});
	return meal;
}

async function getAllOrderMeals(userId) {
	let meal;
	await OrderMeals.find({ userId: userId })
		.then((data) => {
			meal = mutipleMongooseToOject(data);
		});
	return meal;
}

module.exports = new OrderMealController;
