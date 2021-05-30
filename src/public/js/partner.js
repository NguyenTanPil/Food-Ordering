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
// all partner ends

// fetch api
const restaurantsUrl = '/user/api/restaurants-view';
start();

function start() {
	getRestaurants(restaurantsUrl, renderRestaurants);
}

// all restaurant
function getRestaurants(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderRestaurants(restaurants) {
	const listRest = document.querySelector('.list-partners');
	const listRestPops = document.querySelector('.list-pop-res');
	const locations = document.querySelector('.locations .filter-checkbox');
	const locationContainer = [], containerRestPop = [];

	// reset
	listRest.innerHTML = '';
	listRestPops.innerHTML = '';

	restaurants.forEach(restaurant => {
		listRest.appendChild(componentRestaurant(restaurant));
		listRestPops.appendChild(componentRestPop(restaurant));
		renderLocations(restaurant, locations);
	});
	checkStates();
	checkAllLocations();
}

function componentRestaurant(restaurant) {
	const div = document.createElement('div');
	div.className = 'parners-section';
	div.innerHTML = `
		<input type="hidden" value="${restaurant.city} ${restaurant.tag} ${restaurant.cuisine}">
			<div class="partners-bar">
				<div class="partners-top">
					<a href="/views/restaurants/${restaurant.slug}">
						<img src="${restaurant.logo}" alt="logo partners">
					</a>
					<div class="partner-info">
						<a href="/views/restaurants/${restaurant.slug}">
							<h4>${restaurant.name}</h4>
						</a>
						<div class="country">${restaurant.city}</div>
						<div class="location">
							<i class="fa fa-map-marker" aria-hidden="true"></i>
							${restaurant.address}
						</div>
						<div class="btn">
							<button>Partner</button>
							<p>${restaurant.tag}</p>
						</div>
					</div>
					<div class="on-off">
						<p>
							<i class="fa fa-circle" aria-hidden="true"></i>
							<span>Online</span>
						</p>
					</div>
				</div>
				<div class="partners-middle">
					<div class="text">
						<ul>
							<li>Open - Close: ${restaurant.openHour} to ${restaurant.closeHour}</li>
							<li>Cuisines: ${restaurant.cuisine}</li>
							<li>Featured: Treading</li>
							<li>Discount: 10% of on all orders</li>
							<li>Reviews: 
								<div class="stars rating">
								</div>
							</li>
						</ul>
					</div>
					<div class="bookmark">
						<i class="fa fa-bookmark-o" aria-hidden="true"></i>
						<span>bookmark</span>
					</div>
				</div>
				<div class="partners-bottom">
					<ul class="links">
						<li>
							<a href="tel:${restaurant.phoneRestaurant}">
								<i class="fa fa-phone" aria-hidden="true"></i>
								Call now
							</a>
						</li>
						<li class="order-now">
							<a href="views/restaurants/${restaurant.slug}">
								<i class="fa fa-cart-plus" aria-hidden="true"></i>
								Order now
							</a>
						</li>
						<li>
							<a href="views/restaurants/${restaurant.slug}">
								<i class="fa fa-book" aria-hidden="true"></i>
								View menu
							</a>
						</li>
					</ul>
				</div>
			</div>
	`;
	countStar(div, restaurant.stars);
	onlineOrOffline(div, restaurant.open);
	return div;
}

function componentRestPop(restaurant) {
	const li = document.createElement('li');
	li.innerHTML = `
			<a href="/views/restaurants/${restaurant.slug}">
				<img src="${restaurant.logo}" alt="popular">
			</a>
			<div class="caption">
				<a href="/views/restaurants/${restaurant.slug}">
					<h4>${restaurant.name}</h4>
				</a>
				<p>${restaurant.city}</p>
					<div class="stars rating">
					</div>
			</div>
	`;
	countStar(li, restaurant.stars);
	return li;
}

let index = 2;
const listLocations = [];
function renderLocations(restaurant, locations) {
	if(listLocations.indexOf(restaurant.city) < 0) {
		listLocations.push(restaurant.city);
		const div = document.createElement('div');
		div.className = 'check-item';
		div.innerHTML = `
			<input class="location" onchange="filterMeals();" type="checkbox" name="cb" id="chk${index++}" value="${restaurant.city}">
			<div class="state">
				<label for="chk${index}">${restaurant.city}</label>
			</div>
		`;
		locations.appendChild(div);
	}
}

// filter
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
	let restaurantItems = document.querySelectorAll('.parners-section input');
	const hiddenEl = [];
	if(!restaurantItems || restaurantItems.length <= 0) {
		return;
	}
	restaurantItems.forEach(restaurant => {
		if(filters.locations.length > 0) {
			let isShowing = filters.locations.some(location => {
				return restaurant.value.indexOf(location) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(restaurant);
			}
		}
		if(filters.categories.length > 0) {
			let isShowing = filters.categories.some(category => {
				return restaurant.value.indexOf(category) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(restaurant);
			}
		}
		if(filters.cuisines.length > 0) {
			let isShowing = filters.cuisines.some(cuisine => {
				return restaurant.value.indexOf(cuisine) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(restaurant);
			}
		}
		if(filters.offers.length > 0) {
			let isShowing = filters.offers.some(offer => {
				return restaurant.value.indexOf(offer) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(restaurant);
			}
		}
		if(filters.ratings.length > 0) {
			let isShowing = filters.ratings.some(rating => {
				return restaurant.value.indexOf(rating) >= 0;
			});
			if(!isShowing) {
				hiddenEl.push(restaurant);
			}
		}
	});
	restaurantItems.forEach(restaurant => {
		restaurant.parentElement.style.display = 'block';
	});
	if(hiddenEl.length <= 0) {
		return;
	}
	hiddenEl.forEach(el => {
		el.parentElement.style.display = 'none';
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

function countStar(parent, numberStar) {
	const stars = parent.querySelector('.rating');
	let n = parseFloat(numberStar);
	let star;
	const container = [];
	for(let index = 1; index <= 5; index++) {
		if(index <= n) {
			star = 'fa-star';
		} else if(index > n && index < n) {
			star = 'fa-star-half-o';
		} else {
			star = 'fa-star-o';
		}
		container.push(`<i class="fa ${star}" aria-hidden="true"></i>`);
	}
	container.push(`<span>${numberStar}.0</span>`);
	stars.innerHTML = container.join('');
}
function onlineOrOffline(parent, state) {
	const i = parent.querySelector('.on-off');
	const orderNow = parent.querySelector('.links .order-now a');
	if(state == 'already') {
		i.style.color = 'orange';
	} else {
		i.style.color = 'grey';
		orderNow.classList.add('not-active');
	}
}
