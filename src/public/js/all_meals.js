// all partner starts
function checkStates() {
	const checkbox = document.querySelectorAll('.all-partners .check-item');
	checkbox.forEach((item) => {
		const input = item.querySelector('input');
		const state = item.querySelector('.state');
		input.addEventListener('click', (e) => {
			state.classList.toggle('active');
			});
	});
}

const accordions = document.querySelectorAll('.all-partners .accordion');
accordions.forEach((accordion) => {
	const btnFilter = accordion.querySelector('.filters-dropdown');
	const containerCollapse = accordion.querySelector('.container-collapse');
	const collapse = accordion.querySelector('.collapse');
	btnFilter.addEventListener('click', (e) => {
		const collapseHeight = collapse.getBoundingClientRect().height;
		const collapseContainerHeight = containerCollapse.getBoundingClientRect().height;
		if(collapseContainerHeight == 0) {
			containerCollapse.style.height = `${collapseHeight}px`;
			btnFilter.style.paddingBottom = '0';
		} else {
			containerCollapse.style.height = `0`;
			btnFilter.style.paddingBottom = '1rem';
		}
	});
});

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
	const foodsContainer = [], locationContainer = [];
	const foods = document.querySelector('.list-foods .row');
	const locations = document.querySelector('.locations .filter-checkbox');
	for(let i = 0; i < meals.length; i++) {
		const urlRestaurant = `/user/api/restaurants-view/${meals[i].slugRestaurant}`;
		const res = await fetch(urlRestaurant);
		const restaurant = await res.json();
		renderLocations(meals[i], locations);
		foodsContainer.push(renderProducts(meals[i], restaurant));
	}
	foods.innerHTML = foodsContainer.join('');
	checkStates();
	checkAllLocations();
}
let index = 2;
const listLocations = [];
function renderLocations(meal, locations) {
	if(listLocations.indexOf(meal.location) < 0) {
		listLocations.push(meal.location);
		const div = document.createElement('div');
		div.className = 'check-item';
		div.innerHTML = `
			<input class="location" onchange="filterMeals();" type="checkbox" name="cb" id="chk${index++}" value="${meal.location}">
			<div class="state">
				<label for="chk${index}">${meal.location}</label>
			</div>
		`;
		locations.appendChild(div);
	}
}

function renderProducts(meal, restaurant) {
	return `
		<div class="col col-12 col-md-6 col-lg-4 meal-item">
			<div class="card">
			<input type="hidden" value="${meal.location} ${meal.selectMeal} ${meal.cuisineMeal} ${meal.offerMeal}">
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
		</div>
	`;
}

function filterMeals(btns, list) {
	const btnsLocation = document.querySelectorAll('.locations input[type="checkbox"]');
	const btnsCategorie = document.querySelectorAll('.categories input[type="checkbox"]');
	const btnsCuisine = document.querySelectorAll('.cuisines input[type="checkbox"]');
	const btnsOffer = document.querySelectorAll('.offers input[type="checkbox"]');
	const btnsRating = document.querySelectorAll('.rating input[type="checkbox"]');
	const filters = {
		locations: getCheckedCheckboxes(btnsLocation),
		categories: getCheckedCheckboxes(btnsCategorie),
		cuisines: getCheckedCheckboxes(btnsCuisine),
		offers: getCheckedCheckboxes(btnsOffer),
		ratings: getCheckedCheckboxes(btnsRating),
	};
	filterResults(filters);
}

function getCheckedCheckboxes(checkboxes) {
	const listChecked = [];
	if(checkboxes && checkboxes.length > 0) {
		checkboxes.forEach(cb => {
			if(cb.checked) {
				listChecked.push(cb.value);
			}
		});
	}
	return listChecked;
}

function filterResults(filters) {
	let mealsItems = document.querySelectorAll('.meal-item input');
	const hiddenEl = [];
	if(!mealsItems || mealsItems.length <= 0) {
		return;
	}
	mealsItems.forEach(meal => {
		if(filters.locations.length > 0) {
			let isShowing = filters.locations.some(location => {
				return meal.value.indexOf(location) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(meal);
			}
		}
		if(filters.categories.length > 0) {
			let isShowing = filters.categories.some(category => {
				return meal.value.indexOf(category) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(meal);
			}
		}
		if(filters.cuisines.length > 0) {
			let isShowing = filters.cuisines.some(cuisine => {
				return meal.value.indexOf(cuisine) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(meal);
			}
		}
		if(filters.offers.length > 0) {
			let isShowing = filters.offers.some(offer => {
				return meal.value.indexOf(offer) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(meal);
			}
		}
		if(filters.ratings.length > 0) {
			let isShowing = filters.ratings.some(rating => {
				return meal.value.indexOf(rating) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(meal);
			}
		}
	});
	mealsItems.forEach(meal => {
		meal.parentElement.parentElement.style.display = 'block';
	});
	if(hiddenEl.length <= 0) {
		return;
	}
	hiddenEl.forEach(el => {
		el.parentElement.parentElement.style.display = 'none';
	});
}

function checkAllLocations() {
	const all = document.querySelector('#chk1');
	const locations = document.querySelectorAll('.locations .location');
	all.onclick = () => {
		if(all.checked) {
			locations.forEach(location => {
				location.checked = true;
				location.nextElementSibling.classList.add('active');
			});
		}
		else {
			locations.forEach(location => {
				location.checked = false;
				location.nextElementSibling.classList.remove('active');
			});
		}
	}
	locations.forEach(location => {
		location.onclick = () => {
			if(location.checked == false) {
				all.checked = false;
				all.nextElementSibling.classList.remove('active');
				return;
			}
		}
	})
}
