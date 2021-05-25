 
class SiteController {

	// [GET] /home
	index(req, res) {
		res.render('home');
	}
// [GET] /orders
	orders(req, res) {
		res.render('orders', { layout: 'orders' });
	}
// [GET] /about-us
	about_us(req, res) {
		res.render('about_us', { layout: 'about_us' });
	}
	// [GET] /partner_with_us
	partner_with_us(req, res) {
		res.render('partner_with_us', { layout: 'partner_with_us' });
	}
	// [GET] /partner_with_us
	error(req, res) {
		res.render('error', { layout: 'error' });
	}
// [GET] /browse_place
	browse_place(req, res) {
		res.render('browse_place', { layout: 'browse_place' });
	}
}

module.exports = new SiteController;