
class SiteController {

	// [GET] /home
	index(req, res, next) {
		try {
			res.render('home');
		} catch (e) {
			next(err);
		}
	}
	// [GET] /orders
	orders(req, res, next) {
		try {
			res.render('orders', { layout: 'orders' });
		} catch (e) {
			next(err);
		}
	}
	// [GET] /about-us
	about_us(req, res, next) {
		try {
			res.render('about_us', { layout: 'about_us' });
		} catch (e) {
			next(err);
		}
	}
	// [GET] /partner_with_us
	partner_with_us(req, res, next) {
		try {
			res.render('partner_with_us', { layout: 'partner_with_us' });
		} catch (e) {
			next(err);
		}
	}
	// [GET] /partner_with_us
	error(req, res) {
		res.render('error', { layout: 'error' });
	}
	// [GET] /browse_place
	browse_place(req, res, next) {
		try {
			res.render('browse_place', { layout: 'browse_place' });
		} catch (e) {
			next(err);
		}
	}
}

module.exports = new SiteController;