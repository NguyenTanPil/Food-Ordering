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
			<img src="assets/images/user-${item.img}.png" alt="user {item.img}">
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
// recomend and update starts
const listRecmd = [
	{
		id: 1,
		img: '1',
		views: '2',
		time: '12.08',
		name: 'Red Sauce Pasta Recipe',
		des: 'Learn to cook easy vegetarian noodles for beginners',
		date: '25 March 2019',
		stars: '4.0',
		cmt: '05'
	},
	{
		id: 2,
		img: '2',
		views: '9',
		time: '10.12',
		name: 'Tandoori Chicken Recipe',
		des: 'Learn to cook easy tandoori chicken for beginners',
		date: '10 August 2020',
		stars: '3.5',
		cmt: '01'
	},
	{
		id: 3,
		img: '3',
		views: '8',
		time: '19.67',
		name: 'Veggie Burger Recipe',
		des: 'Learn to cook easy vegetarian Burgur for beginners',
		date: '12 June 2020',
		stars: '5.0',
		cmt: '21'
	},
	{
		id: 4,
		img: '4',
		views: '3',
		time: '09.98',
		name: 'Veggie Tangdi Recipe',
		des: 'Learn to cook easy non veg Tangdi kabab for beginners',
		date: '26 May 2019',
		stars: '2.5',
		cmt: '03'
	},
	{
		id: 5,
		img: '5',
		views: '5',
		time: '14.39',
		name: 'Veggie Pasta Recipe',
		des: 'Learn to cook easy italian pasta for beginners',
		date: '24 July 2020',
		stars: '1.5',
		cmt: '49'
	},
	{
		id: 6,
		img: '6',
		views: '1',
		time: '17.11',
		name: 'Veggie Street Food Recipe',
		des: 'Learn to cook easy street food pani pur for beginners',
		date: '23 Januaty 2020',
		stars: '1.0',
		cmt: '00'
	},
	{
		id: 7,
		img: '7',
		views: '6',
		time: '17.48',
		name: 'Cooking Potato Recipe',
		des: 'Learn to cook potato french fries at home for beginners',
		date: '09 February 2020',
		stars: '3.0',
		cmt: '11'
	},
	{
		id: 8,
		img: '8',
		views: '4',
		time: '15.08',
		name: 'Veggie Pizza Recipe',
		des: 'Learn to cook easy cheese pizza for beginners',
		date: '21 April 2020',
		stars: '2.0',
		cmt: '09'
	}
];
const listUpdate = [
	{
		id: 1,
		img: '1',
		views: '2',
		time: '12.08',
		name: 'Red Sauce Pasta Recipe',
		des: 'Learn to cook easy vegetarian noodles for beginners',
		date: '25 March 2019',
		stars: '4.0',
		cmt: '05'
	},
	{
		id: 2,
		img: '2',
		views: '9',
		time: '10.12',
		name: 'Tandoori Chicken Recipe',
		des: 'Learn to cook easy tandoori chicken for beginners',
		date: '10 August 2020',
		stars: '3.5',
		cmt: '01'
	},
	{
		id: 3,
		img: '3',
		views: '8',
		time: '19.67',
		name: 'Veggie Burger Recipe',
		des: 'Learn to cook easy vegetarian Burgur for beginners',
		date: '12 June 2020',
		stars: '5.0',
		cmt: '21'
	},
	{
		id: 4,
		img: '4',
		views: '3',
		time: '09.98',
		name: 'Veggie Tangdi Recipe',
		des: 'Learn to cook easy non veg Tangdi kabab for beginners',
		date: '26 May 2019',
		stars: '2.5',
		cmt: '03'
	},
	{
		id: 5,
		img: '5',
		views: '5',
		time: '14.39',
		name: 'Veggie Pasta Recipe',
		des: 'Learn to cook easy italian pasta for beginners',
		date: '24 July 2020',
		stars: '1.5',
		cmt: '49'
	},
	{
		id: 6,
		img: '6',
		views: '1',
		time: '17.11',
		name: 'Veggie Street Food Recipe',
		des: 'Learn to cook easy street food pani pur for beginners',
		date: '23 Januaty 2020',
		stars: '1.0',
		cmt: '00'
	},
	{
		id: 7,
		img: '7',
		views: '6',
		time: '17.48',
		name: 'Cooking Potato Recipe',
		des: 'Learn to cook potato french fries at home for beginners',
		date: '09 February 2020',
		stars: '3.0',
		cmt: '11'
	},
	{
		id: 8,
		img: '8',
		views: '4',
		time: '15.08',
		name: 'Veggie Pizza Recipe',
		des: 'Learn to cook easy cheese pizza for beginners',
		date: '21 April 2020',
		stars: '2.0',
		cmt: '09'
	}
];
function video(parent, child) {
	const div = document.createElement('div');
	div.className = 'col col-12 col-md-6 col-lg-4 col-xl-3';
	div.innerHTML = `
		<div class="recipe-video">
			<div class="top">
				<div class="my-bg-gradient"></div>
				<img src="assets/images/video-${child.img}.jpg" alt="video ${child.img}">
				<div class="top-items">
					<div class="views">
						<p>
							<i class="fa fa-eye" aria-hidden="true"></i>
							${child.views}m views
						</p>
					</div>
					<div class="video-time">
						<p>
							<i class="fa fa-clock-o" aria-hidden="true"></i>
							${child.time}
						</p>
					</div>
				</div> 
				<div class="middle-items">
					<a href="#">
						<div class="play">
							<i class="fa fa-play" aria-hidden="true"></i>
						</div>
					</a>
				</div> 
			</div> 
			<div class="desciption">
				<div class="video-title">
					<a href="#">
						<h3>${child.name}</h3>
					</a>
					<h4>${child.des}</h4>
				</div>
				<div class="published">
					<p>Published ${child.date}</p>
				</div>
				<div class="rating-cmt">
					<div class="rating">
						<i class="fa" aria-hidden="true"></i>
						<i class="fa" aria-hidden="true"></i>
						<i class="fa" aria-hidden="true"></i>
						<i class="fa" aria-hidden="true"></i>
						<i class="fa" aria-hidden="true"></i>
						<span>${child.stars}</span>
					</div>
					<div class="comment">
						<a href="#">
							<i class="fa fa-envelope" aria-hidden="true"></i>
							<span>${child.cmt}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	`;
	countStar(div, child.stars);
	parent.appendChild(div);
}
const recomend = document.querySelector('.list-recomended');
listRecmd.forEach((item) => {
	video(recomend, item);
});
const update = document.querySelector('.list-update');
listUpdate.forEach((item) => {
	video(update, item);
});
// count star
function countStar(parent, numberStar) {
	const stars = parent.querySelectorAll('.rating i');
	let n = parseFloat(numberStar);
	let star = '';
	stars.forEach((item, index) => {
		if(index + 1 <= n) {
			star = 'star';
		} else if(index + 1 > n && index < n) {
			star = 'star-half-o';
		} else {
			star = 'star-o';
		}
		item.classList.add(`fa-${star}`);
	});
}
// recomend and update ends
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