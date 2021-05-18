
const Handlebars = require('handlebars');

module.exports = {
	sum: (a, b) => a + b,
	checkFirst: (index) => (index == 0),
	isCheckedCheckbox: (value, list) => list.find((day) => day == value),
	isCheckedRadio: (value, list) => (value == list),
};