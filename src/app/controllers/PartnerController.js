
class PartnerController {

	// [GET] /recipe
	index(req, res) {
		res.render('partner', { layout: 'partner' });
	}
	// [GET] /recipe/recipe-details
	restaurant_detail_view(req, res) {
		res.render('restaurant_detail_view', { layout: 'restaurant_detail_view' });
	}

}

module.exports = new PartnerController;
