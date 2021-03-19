// loading starts
window.onload = function() {
	document.querySelector('.loading').style.display = 'none';
}
// loading ends
const search = document.querySelector('.menu-sab:last-child');
const formSearch = search.querySelector('form');
const searchMenu = search.querySelector('.search-menu');
const hiddenMenu = search.querySelector('.hidden-menu');
searchMenu.addEventListener('click', (e) => {
	e.target.style.display = 'none';
	hiddenMenu.style.display = 'block';
	formSearch.classList.add('active');
});
hiddenMenu.addEventListener('click', (e) => {
	e.target.style.display = 'none';
	searchMenu.style.display = 'block';
	searchMenu.style.color = 'gray';
	formSearch.classList.remove('active');
});
// places starts
new Splide( '.browse-places .splide', {
	type: 'loop',
	perPage: 6,
	perMove: 1,
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
