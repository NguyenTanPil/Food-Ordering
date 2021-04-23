// import
const recipeRouter = require('./recipe.js');
const partnerRouter = require('./partner.js');
const siteRouter = require('./site.js');


function route(app) {

	app.use('/recipe', recipeRouter);
	app.use('/partner', partnerRouter);
	app.use('/', siteRouter);

}

module.exports = route;
