// import
const recipeRouter = require('./recipe.js');
const userRouter = require('./user.js');
const restaurantRouter = require('./restaurant.js');
const mealRouter = require('./meal.js');
const partnerRouter = require('./partner.js');
const siteRouter = require('./site.js');


function route(app) {

	app.use('/user/restaurant/:slug/meal', mealRouter);
	app.use('/user/restaurant', restaurantRouter);
	app.use('/user', userRouter);
	app.use('/recipe', recipeRouter);
	app.use('/partner', partnerRouter);
	app.use('/', siteRouter);

}

module.exports = route;
