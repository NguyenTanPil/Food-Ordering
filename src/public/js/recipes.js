// loading page
window.onload = function() {
	document.querySelector('.loading').style.display = 'none';
	let imgRecipes = document.querySelector('.img-recipes');
	let overlays = document.querySelectorAll('.overlay');
	overlays.forEach((overlay) => {
		overlay.style.width = `${imgRecipes.offsetWidth}px`;
	});
}
// recipes starts
const listRecipes = [
	{
		id: 1,
		img: '01',
		title: 'North Indian',
		video: 71
	},
	{
		id: 2,
		img: '02',
		title: 'North Indian',
		video: 72
	},
	{
		id: 3,
		img: '03',
		title: 'North Indian',
		video: 73
	},
	{
		id: 4,
		img: '04',
		title: 'North Indian',
		video: 74
	},
	{
		id: 5,
		img: '05',
		title: 'North Indian',
		video: 75
	},
	{
		id: 6,
		img: '06',
		title: 'North Indian',
		video: 75
	}
];
const ul = document.querySelector('.category-recipes .splide__list');
listRecipes.forEach((item) => {
	const li = document.createElement('li');
	li.className = 'splide__slide';
	li.innerHTML = `
		<div class="recipe-item">
			<img src="/images/recipe_${item.img}.jpg" alt="recipe" class="img-recipes">
			<div class="overlay">
				<div class="recipes-title">
					<h6>${item.title}</h6>
					<p>${item.video} Videos</p>
				</div>
			</div>
		</div>
	`;
	ul.appendChild(li);
});
// recipes ends
// video main starts
const listUsd = [
	{
		id: 1,
		img: '1',
		text: 'Johnson',
		reviews: '7'
	},
	{
		id: 2,
		img: '2',
		text: 'Jassia William',
		reviews: '5'
	},
	{
		id: 3,
		img: '3',
		text: 'Rock',
		reviews: '0'
	},
	{
		id: 4,
		img: '4',
		text: 'Davil Smith',
		reviews: '10'
	},
	{
		id: 5,
		img: '5',
		text: 'Ricky Doe',
		reviews: '3'
	}
];
const sugges = document.querySelector('.suggestions-list');
listUsd.forEach((item) => {
	const div = document.createElement('div');
	div.className = 'suggestion-usd';
	div.innerHTML = `
		<a href="#">
			<img src="/images/user-${item.img}.png" alt="user {item.img}">
		</a>
		<div class="sgt-text">
			<a href="#">${item.text}</a>
			<span>
				${item.reviews} Reviews
			</span>
		</div>
		<button>
			<i class="fa fa-user-plus" aria-hidden="true"></i>
		</button>
	`;
	sugges.appendChild(div);
});
// video main ends
// splide starts
new Splide( '.category-recipes .splide', {
	type: 'loop',
	perPage: 3,
	perMove: 1,
	pagination: false,
	arrows: false,
	breakpoints: {
		576: {
			perPage: 1,
		},
		768: {
			perPage: 1,
		},
		992: {
			perPage: 2,
		},
		1200: {
			perPage: 2,
		},
		1400: {
			perPage: 3,
		}
	}
}).mount();
// set size of image
window.addEventListener('resize', () => {
	let imgRecipes = document.querySelector('.img-recipes');
	let overlays = document.querySelectorAll('.overlay');
	overlays.forEach((overlay) => {
		overlay.style.width = `${imgRecipes.offsetWidth}px`;
	});
});