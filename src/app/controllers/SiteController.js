
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
// [GET] /add_restaurant
	add_restaurant(req, res) {
		res.render('add_restaurant', { layout: 'add_restaurant' });
	}
// [GET] /login
	login(req, res) {
		res.render('login', { layout: 'login' });
	}
// [GET] /partner_with_us
	partner_with_us(req, res) {
		res.render('partner_with_us', { layout: 'partner_with_us' });
	}
// [GET] /signup
	signup(req, res) {
		res.render('signup', { layout: 'signup' });
	}
// [GET] /upload_video
	upload_video(req, res) {
		res.render('upload_video', { layout: 'upload_video' });
	}

}

module.exports = new SiteController;