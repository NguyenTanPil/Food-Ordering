// nhung don dat hang cua user
const OrderMeals = require('../../app/models/OrderMeal.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class OrderMealController {
	// [GET] /user/api/order-meals
	async fetchOrderMeals(req, res) {
		const userId = req.cookies.userId;
		const orderMeals = getOrderMeals(userId);
		const orderMealsUser = await orderMeals;
		res.json(orderMealsUser);
	}
	// [PATCH] /user/api/order-meals/:slug
	async updateOrderMeals(req, res) {
		OrderMeals.updateOne({ _id: req.params.slug }, req.body)
			.then(() => console.log('cap nhat thanh cong'))
			.catch(() => console.log('Khong thanh cong roi'));
	}
	// [DELETE] /user/api/order-meals/:slug
	async deleteOrderMeals(req, res) {
		OrderMeals.updateOne({ _id: req.params.slug })
			.then(() => console.log('Xoa thanh cong'))
			.catch(() => console.log('Khong thanh cong roi'));
	}
}

// function
async function getOrderMeals(userId) {
	let meal;
	await OrderMeals.find({ userId: userId })
		.then((data) => {
			meal = mutipleMongooseToOject(data);
		});
	return meal;
}

module.exports = new OrderMealController;
