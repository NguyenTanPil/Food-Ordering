// fetch api
const mealsUrl = '/user/api/meals-view';
const restaurantsUrl =  '/user/api/restaurants-view';
start();

function start() {
	getMeals(mealsUrl, renderMeals);
	getRestaurants(restaurantsUrl, renderRestaurants);
}

function getMeals(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderMeals(meals) {
	const container = [];
	const listTreanding = document.querySelector('.list-treading');
	meals.forEach(meal => {
		const urlRestaurant = `/user/api/restaurants-view/${meal.slugRestaurant}`;
		getRestaurant(urlRestaurant, (restaurant) => {
			renderProducts(meal, restaurant);
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
