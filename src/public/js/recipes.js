// fetch api
const videoUrl = '/user/api/videos-view';
let arrCheckFind = [];
start();

function start() {
	getVideosView(videoUrl, renderVideosView);
}

function getVideosView(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderVideosView(videos) {
	const recommend = document.querySelector('.recomended .container .content');
	const recent = document.querySelector('.update .container .content');
	recommend.innerHTML = '';
	recent.innerHTML = '';
	videos.forEach(video => {
		arrCheckFind.push(video.slug);
		recommend.appendChild(componentRecommendVideos(video));
		recent.appendChild(componentRecommendVideos(video));
	})

	componentMainVideo(videos[0]);
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function componentMainVideo(video) {
	const date = new Date(video.createdAt);
	const main = document.querySelector('.main-video .col-lg-9');
	main.innerHTML = '';
	const div = document.createElement('div');
	div.className = 'video';
	div.innerHTML = `
		<div class="my-bg-gradient"></div>
			<img src="${video.thumbnail}" alt="main-video">
			<div class="top-items">
				<div class="views">
					<p>
						<i class="fa fa-eye" aria-hidden="true"></i>
						2m views
					</p>
				</div>
				<div class="video-time">
					<p>
						<i class="fa fa-clock-o" aria-hidden="true"></i>
						12.08
					</p>
				</div>
			</div>
			<div class="bottom-items">
				<div class="video-title">
					<a href="/views/recipes/${video.slug}">
						<h4>${video.title}</h4>
					</a>
					<div class="bottom-star">
						<div class="rating">
						</div>
						<div class="published">
							<p><span>Published</span> ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="middle-items">
				<a href="/views/recipes/${video.slug}">
					<div class="play">
						<i class="fa fa-play" aria-hidden="true"></i>
					</div>
				</a>
			</div>
	`;
	countStar(div, video.stars);
	main.appendChild(div);
}

function componentRecommendVideos(video) {
	const date = new Date(video.createdAt);
	const div = document.createElement('div');
	div.className = 'col col-12 col-md-6 col-lg-4 col-xl-3';
	div.innerHTML = `
			<div class="recipe-video">
				<div class="top">
					<div class="my-bg-gradient"></div>
					<img src="${video.thumbnail}" alt="">
					<div class="top-items">
						<div class="views">
							<p>
								<i class="fa fa-eye" aria-hidden="true"></i>
								2m views
							</p>
						</div>
						<div class="video-time">
							<p>
								<i class="fa fa-clock-o" aria-hidden="true"></i>
								10.00
							</p>
						</div>
					</div>
						<div class="middle-items">
						<a href="/views/recipes/${video.slug}">
							<div class="play">
								<i class="fa fa-play" aria-hidden="true"></i>
							</div>
						</a>
					</div>
				</div>
				<div class="desciption">
					<div class="video-title">
						<a href="/views/recipes/${video.slug}">
							<h4>${video.title}</h4>
						</a>
					</div>
					<div class="published">
							<p><span>Published</span> ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</p>
					</div>
					<div class="rating-cmt">
						<div class="rating">
						</div>
						<div class="comment">
							<a href="/views/recipes/${video.slug}">
								<i class="fa fa-envelope" aria-hidden="true"></i>
								<span>03</span>
							</a>
						</div>
					</div>
				</div>
			</div>
	`;
	countStar(div, video.stars);
	return div;
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
new Splide('.category-recipes .splide', {
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

// search
const formSearchRecipe = document.querySelector('.search-recipe');
const inputSearchRecipe = formSearchRecipe.querySelector('input');
formSearchRecipe.onsubmit = async (e) => {
	let valueSearch = inputSearchRecipe.value;
	valueSearch = valueSearch.toLowerCase().replaceAll(' ', '-');
	const status = arrCheckFind.some(recipe => recipe == valueSearch);
	if (status) {
		formSearchRecipe.action = `/views/recipes/${valueSearch}`;
	} else {
		return;
	}
}

// count stars
function countStar(parent, numberStar) {
	const stars = parent.querySelector('.rating');
	let n = parseFloat(numberStar);
	let star;
	const container = [];
	for (let index = 1; index <= 5; index++) {
		if (index <= n) {
			star = 'fa-star';
		} else if (index > n && index < n) {
			star = 'fa-star-half-o';
		} else {
			star = 'fa-star-o';
		}
		container.push(`<i class="fa ${star}" aria-hidden="true"></i>`);
	}
	container.push(`<span>${numberStar}.0</span>`);
	stars.innerHTML = container.join('');
}
