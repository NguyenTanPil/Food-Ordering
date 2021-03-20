window.onload = function() {
	document.querySelector('.loading').style.display = 'none';
}
const imgRecipes = document.querySelector('.img-recipes');
const overlay = document.querySelectorAll('.category-recipes .overlay');
console.log(overlay);
overlay.forEach((item) => {
	item.style.width = `${imgRecipes.offsetWidth}px`;
});
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
			<img src="assets/images/recipe_${item.img}.jpg" alt="recipe" class="img-recipes">
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
		992: {
			perPage: 1,
		},
		1300: {
			perPage: 2,
		},
		1400: {
			perPage: 3,
		}
	}
}).mount();