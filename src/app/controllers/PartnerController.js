
class PartnerController {

	// [GET] /recipe
	index(req, res) {
		res.render('partner', { layout: 'partner' });
	}
}

module.exports = new PartnerController;
