// all partner starts
const accordions = document.querySelectorAll('.all-partners .accordion');
setHeightAccordionItem(accordions);
// url 
const urlString = window.location.href;
const urlFind = new URL(urlString);
let locationFind = urlFind.searchParams.get('location');
const restaurantFind = [urlFind.searchParams.get('restaurant')];
const categorieFind = [urlFind.searchParams.get('categorie')];

// fetch api
const mealsUrl = '/user/api/meals-view';
start();

function start() {
	getMeals(mealsUrl, renderMeals);
}

function getMeals(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

async function renderMeals(meals) {
	const foods = document.querySelector('.list-foods .row');
	const locations = document.querySelector('.locations .filter-checkbox');
	foods.innerHTML = '';
	for (let i = 0; i < meals.length; i++) {
		const urlRestaurant = `/user/api/restaurants-view/${meals[i].slugRestaurant}`;
		const res = await fetch(urlRestaurant);
		const restaurant = await res.json();
		renderLocations(meals[i], locations);
		renderProducts(meals[i], restaurant);
	}
	const filters = document.querySelectorAll('.filter-checkbox');
	filterCheckboxes(filters);
	findMealsByUrl();
}
let index = 2;
const listLocations = [];
function renderLocations(meal, locations) {
	if (listLocations.indexOf(meal.location) < 0) {
		listLocations.push(meal.location);
		const div = document.createElement('div');
		div.className = 'check-item';
		div.innerHTML = `
			<input class="filter-check-input location" onchange="filters();" type="checkbox" name="cb" id="chk${index}" value="${meal.location}">
			<div class="state-check">
				<label class="filter-check-label" for="chk${index++}">${meal.location}</label>
			</div>
		`;
		locations.appendChild(div);
	}
}

function renderProducts(meal, restaurant) {
	const foods = document.querySelector('.list-foods .row');
	const div = document.createElement('div');
	div.className = 'col col-12 col-lg-6 col-xl-4 meal-item';
	div.innerHTML = `
			<div class="card">
			<input type="hidden" value="${meal.location} ${meal.selectMeal} ${meal.cuisineMeal} ${meal.offerMeal} ${meal.slugRestaurant} ${meal.stars}.0">
				<div class="card-img-top">
					<img src="${meal.photos[0]}" alt="meal">
					<a class="theme"></a>
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
							Delivery : Free
						</div>
						<div class="time">
							<i class="fa fa-clock-o" aria-hidden="true"></i>
							Delivery Time : 30 Min
						</div>
						<div class="feed-back">
							<div class="stars rating">
							</div>
							<div class="commnents">
								<a href="#">
									<i class="fa fa-comment" aria-hidden="true"></i>
									${meal.reviews}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
	`;
	countStar(div, meal.stars);
	foods.appendChild(div);
}

function findMealsByUrl() {
	if (locationFind) {
		locationFind = formatStringCapitalize(locationFind);
		const inputLocation = document.querySelector('input[value="' + locationFind + '"]');
		inputLocation.checked = true;
		inputLocation.parentElement.querySelector('.state').classList.add('active');
		filterMeals();
	} else if (categorieFind[0] != null) {
		const inputCategorie = document.querySelector('input[value="' + categorieFind + '"]');
		inputCategorie.checked = true;
		inputCategorie.parentElement.querySelector('.state').classList.add('active');
		filterMeals();
	} else {
		return;
	}
}

function formatStringCapitalize(string) {
	string = string.toLowerCase();
	const array = string.split(' ');
	return array.map(item => item[0].toUpperCase() + item.substring(1)).join(' ');
}