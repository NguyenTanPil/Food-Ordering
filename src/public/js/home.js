// fetch api
const mealsUrl = '/user/api/meals-view';
const restaurantsUrl =  '/user/api/restaurants-view';
start();

function start() {
	getMeals(mealsUrl, (meals) => {
		renderMeals(meals, '');
	});
	getRestaurants(restaurantsUrl, renderRestaurants);
}

function getMeals(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderMeals(meals, search) {
	const container = [];
	const listTreanding = document.querySelector('.list-treading');
	meals.forEach(meal => {
		const urlRestaurant = `/user/api/restaurants-view/${meal.slugRestaurant}`;
		getRestaurant(urlRestaurant, (restaurant) => {
			if(search != '') {
				if(meal.location.toLowerCase() == search.toLowerCase()) {
					renderProducts(meal, restaurant);
				}
			} else {
				renderProducts(meal, restaurant);
			}
		});
		container.push(componentMealTreanding(meal));
	});
	listTreanding.innerHTML = container.join('');
}

function getRestaurant(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderProducts(meal, restaurant) {
	const foods = document.querySelector('.foods-online');
	const div =  document.createElement('div');
	div.className = 'col col-12 col-md-6 col-lg-4 col-xl-3 meal-item';
	div.innerHTML = `
			<div class="card">
				<div class="card-img-top">
					<img src="${meal.photos[0]}" alt="meal">
					<a href="#" class="theme"></a>
				</div>
				<div class="content">
					<div class="top-text">
						<div class="logo-img">
							<img src="${restaurant.logo}" alt="logo">
						</div>
						<div class="text">
							<div class="heading">
								<h4>
									<a href="/views/meals/${meal.slug}" class="text-white">${meal.name}</a>
								</h4>
							</div>
							<div class="sub-heading">
								<h5>
									<a href="/views/restaurants/${meal.slugRestaurant}" class="text-dark">${restaurant.name}</a>
								</h5>
							</div>
						</div>
						<p>$${meal.price}.00</p>
					</div>
					<div class="bottom-text">
						<div class="delivery">
							<i class="fa fa-shopping-cart" aria-hidden="true"></i>
							Delivery Free : Free
						</div>
						<div class="time">
							<i class="fa fa-clock-o" aria-hidden="true"></i>
							Delivery Time : 30 Min
						</div>
						<div class="feed-back">
							<div class="stars">
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
							</div>
							<span>4.5</span>
							<div class="commnents">
								<a href="#">
									<i class="fa fa-comment" aria-hidden="true"></i>
									05
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
	`;
	foods.appendChild(div);
}

function getRestaurants(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderRestaurants(restaurants) {
	const listFeatures = document.querySelector('.list-features');
	const container = [];
	restaurants.forEach(restaurant => {
		container.push(componentRestaurantFeature(restaurant));
	});
	listFeatures.innerHTML =  container.join('');
}

function componentRestaurantFeature(restaurant) {
	return `
		<div class="feature-item">
			<div class="row">
				<div class="col-12 col-md-4">
					<div class="img-item">
						<img src="${restaurant.logo}" alt="Featured">
						<div class="info-img">
							<h4>${restaurant.name}</h4>
							<p>VietName Restaurant</p>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="location-item text-center">
						<span class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
						<span class="text">${restaurant.city} City</span>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="btn-item">
						<a href="/views/restaurants/${restaurant.slug}" class="btn my-btn" role="button" data-bs-toggle="button">View Menu</a>
					</div>
				</div>
			</div>
		</div>
	`;
}

function componentMealTreanding(meal) {
	return `
	<div class="treading-item">
		<div class="row">
			<div class="col-7 col-md-6">
				<div class="img-item">
					<img src="${meal.photos[0]}" alt="Featured">
					<div class="info-img">
						<h4>${meal.name}</h4>
						<p>Treading</p>
					</div>
				</div>
			</div>
			<div class="col-5 col-md-6">
				<div class="btn-item">
					<a href="/views/meals/${meal.slug}" class="my-btn" role="button" data-bs-toggle="button">View <span>Menu</span></a>
				</div>
			</div>
		</div>
		</div>
	`;
}

// form search
const formSeach = document.querySelector('.form-search');
formSeach.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchLocaton = document.querySelector('.form-search button');
	const input = document.querySelector('.form-search input').value;
	const foodsOnline = document.querySelector('.foods-online');
	// reset
	foodsOnline.innerHTML = '';
	getMeals(mealsUrl, (meals) => {
		renderMeals(meals, input);
	});
})

// quick search, browse place, favorite recipes
const listOrderOnlines = [
	{
		id: 1,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033667/systems/meal-1_trkary.svg',
		name: 'Breakfast'
	},
	{
		id: 2,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033667/systems/meal-2_gpch3l.svg',
		name: 'Lunch'
	},
	{
		id: 3,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033666/systems/meal-3_nqz5fr.svg',
		name: 'Dinner'
	},
	{	
		id: 4,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033668/systems/meal-4_uk5wmz.svg',
		name: 'Cafe\'s'
	},
	{
		id: 5,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033666/systems/meal-5_bvrvio.svg',
		name: 'Delivery'
	},
	{
		id: 6,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033667/systems/meal-1_trkary.svg',
		name: 'Breakfast'
	},
	{
		id: 7,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033667/systems/meal-2_gpch3l.svg',
		name: 'Lunch'
	},
	{
		id: 8,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033666/systems/meal-3_nqz5fr.svg',
		name: 'Dinner'
	},
	{
		id: 9,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033668/systems/meal-4_uk5wmz.svg',
		name: 'Cafe\''
	},
	{
		id: 10,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622033666/systems/meal-5_bvrvio.svg',
		name: 'Delivery'
	},
];

const listBrowsePlaces = [
	{
		id: 1,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034347/systems/01_tpiobv.svg',
		name: 'Near by'
	},
	{
		id: 2,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034347/systems/02_ovhaiy.svg',
		name: 'Cafes & More'
	},
	{
		id: 3,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034347/systems/03_m4r91u.svg',
		name: 'Drinks & Nightkise'
	},
	{
		id: 4,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034344/systems/04_kykevg.svg',
		name: 'Desserts & Bakes'
	},
	{
		id: 5,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034346/systems/05_kpqafx.svg',
		name: 'Upcoming Events'
	},
	{
		id: 6,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034345/systems/06_edughw.svg',
		name: 'Newly Opened'
	},
	{
		id: 7,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034347/systems/01_tpiobv.svg',
		name: 'Near by'
	},
	{
		id: 8,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034347/systems/02_ovhaiy.svg',
		name: 'Cafes & More'
	},
	{
		id: 9,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034347/systems/03_m4r91u.svg',
		name: 'Drinks & Nightkise'
	},
	{
		id: 10,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034344/systems/04_kykevg.svg',
		name: 'Desserts & Bakes'
	},
	{
		id: 11,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034346/systems/05_kpqafx.svg',
		name: 'Upcoming Events'
	},
	{
		id: 12,
		img: 'https://res.cloudinary.com/food-odering/image/upload/v1622034345/systems/06_edughw.svg',
		name: 'Newly Opened'
	},
];

const listFavoriteRecipes = [
	{
		id: 1,
		img: '../images/recipe_01.jpg',
		type: 'North Indian',
		video: '75'
	},
	{
		id: 2,
		img: '../images/recipe_02.jpg',
		type: 'Fast Food',
		video: '105'
	},
	{
		id: 3,
		img: '../images/recipe_03.jpg',
		type: 'Italian Food',
		video: '35'
	},
	{
		id: 4,
		img: '../images/recipe_04.jpg',
		type: 'Chinese Food',
		video: '60'
	},
	{
		id: 5,
		img: '../images/recipe_05.jpg',
		type: 'Street Food',
		video: '45'
	},
	{
		id: 6,
		img: '../images/recipe_06.jpg',
		type: 'Bakery',
		video: '20'
	},
];

renderBrowsePlaces();
renderOrderOnlines();
renderFavoriteRecipes();

function renderBrowsePlaces() {
	const browsePlace = document.querySelector('.browse-places .splide__list');
	const containerBrowsePlace = [];
	listBrowsePlaces.forEach(browse => {
		containerBrowsePlace.push(componentBrowsePlace(browse));
	});
	browsePlace.innerHTML =  containerBrowsePlace.join('');
}

function componentBrowsePlace(place) {
	return `
		<li class="splide__slide">
			<div class="places">
				<a href="/views/all-meals">
					<div class="places-icon">
						<img src="${place.img}" class="d-block mx-auto" alt="places logo">
					</div>
					<div class="places-text">
						${place.name}
					</div>
				</a>
			</div>
		</li>
	`;
}

function renderOrderOnlines() {
	const quickSearch = document.querySelector('.quick-searches .splide__list');
	const containerQuickSearch = [];
	listOrderOnlines.forEach(order => {
		containerQuickSearch.push(componentOrderOnline(order));
	});
	quickSearch.innerHTML =  containerQuickSearch.join('');
}

function componentOrderOnline(order) {
	return `
		<li class="splide__slide">
			<div class="places">
				<a href="/views/all-meals?categorie=${order.name}">
					<div class="places-icon">
						<img src="${order.img}" class="d-block mx-auto" alt="places logo">
					</div>
					<div class="places-text">
						${order.name}
					</div>
				</a>
			</div>
		</li>
	`;
}

function renderFavoriteRecipes() {
	const listRecipe = document.querySelector('.list-recipes');
	const container = [];
	listFavoriteRecipes.forEach(recipe => {
		container.push(componentFavoriteRecipe(recipe));
	});
	listRecipe.innerHTML =  container.join('');
}

function componentFavoriteRecipe(recipe) {
	return `
		<div class="col col-12 col-md-6 col-lg-4">
			<a href="/views/recipes">
				<div class="recipe-item">
					<img src="${recipe.img}" alt="recipe image">
					<div class="overlay">
						<h6>${recipe.type}</h6>
						<p>${recipe.video} Videos</p>
					</div>
				</div>
			</a>
		</div>
	`;
}

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
