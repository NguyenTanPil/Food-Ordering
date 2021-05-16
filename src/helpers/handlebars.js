
const Handlebars = require('handlebars');

module.exports = {
	checkbox: Handlebars.registerHelper('isCheckedCheckbox', function (value, list) {
	  return list.find((day) => day == value);
	}),
	radio: Handlebars.registerHelper('isCheckedRadio', function (value, list) {
	  return value == list;
	})
};