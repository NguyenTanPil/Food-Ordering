// import
const recipeRouter = require('./recipe.js');
const userRouter = require('./user.js');
const restaurantRouter = require('./restaurant.js');
const mealRouter = require('./meal.js');
const partnerRouter = require('./partner.js');
const siteRouter = require('./site.js');
const apiRouter = require('./api.js');
const viewsRouter = require('./views.js');

function route(app) {

	app.use('/user/restaurant/:slug/meal', mealRouter);
	app.use('/user/restaurant', restaurantRouter);
	app.use('/user/api', apiRouter);
	app.use('/user/recipe', recipeRouter);
	app.use('/user', userRouter);
	app.use('/partner', partnerRouter);
	app.use('/views', viewsRouter);
	app.use('/', siteRouter);

}

module.exports = route;
