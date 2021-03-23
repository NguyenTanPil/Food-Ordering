// places starts
new Splide( '.browse-places .splide', {
	type: 'loop',
	perPage: 6,
	perMove: 1,
	pagination: false,
	arrows: false,
	autoplay: 'true',
	breakpoints: {
		576: {
			perPage: 1,
		},
		768: {
			perPage: 2,
		},
		1200: {
			perPage: 4,
		},
	}
}).mount();
// places ends
// restaurants starts
new Splide( '.restaurant .splide', {
	type: 'loop',
	perPage: 5,
	perMove: 1,
	pagination: false,
	breakpoints: {
		576: {
			perPage: 1,
		},
		992: {
			perPage: 2,
		},
		1200: {
			perPage: 3,
		},
		1400: {
			perPage: 4,
		}
	}
}).mount();
// restaurants ends
// quick searches starts
new Splide( '.quick-searches .splide', {
	type: 'loop',
	perPage: 5,
	perMove: 1,
	autoplay: 'true',
	pagination: false,
	arrows: false,
	breakpoints: {
		576: {
			perPage: 2,
		},
		768: {
			perPage: 3,
		},
		1200: {
			perPage: 4,
		},
	}
}).mount();
// quick searches ends
