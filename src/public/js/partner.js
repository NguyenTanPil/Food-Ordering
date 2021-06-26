// all partner starts
const accordions = document.querySelectorAll('.all-partners .accordion');
setHeightAccordionItem(accordions);
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

	// reset
	listRest.innerHTML = '';
	listRestPops.innerHTML = '';

	restaurants.forEach(restaurant => {
		listRest.appendChild(componentRestaurant(restaurant));
		listRestPops.appendChild(componentRestPop(restaurant));
		renderLocations(restaurant, locations);
	});
	const filters = document.querySelectorAll('.filter-checkbox');
	filterCheckboxes(filters);
}

function componentRestaurant(restaurant) {
	const div = document.createElement('div');
	div.className = 'partners-section';
	div.innerHTML = `
		<input type="hidden" value="${restaurant.city} ${restaurant.tag} ${restaurant.cuisine} ${restaurant.stars}.0">
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
						<div class="btns">
							<button class="btn">Partner</button>
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
							<a href="/views/restaurants/${restaurant.slug}">
								<i class="fa fa-cart-plus" aria-hidden="true"></i>
								Order now
							</a>
						</li>
						<li>
							<a href="/views/restaurants/${restaurant.slug}">
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
	if (listLocations.indexOf(restaurant.city) < 0) {
		listLocations.push(restaurant.city);
		const div = document.createElement('div');
		div.className = 'check-item';
		div.innerHTML = `
			<input class="filter-check-input location" onchange="filters();" type="checkbox" name="cb" id="chk${index}" value="${restaurant.city}">
			<div class="state-check">
				<label class="filter-check-label" for="chk${index++}">${restaurant.city}</label>
			</div>
		`;
		locations.appendChild(div);
	}
}

function onlineOrOffline(parent, state) {
	const i = parent.querySelector('.on-off');
	const orderNow = parent.querySelector('.links .order-now a');
	if (state == 'already') {
		i.style.color = 'orange';
	} else {
		i.style.color = 'grey';
		orderNow.classList.add('not-active');
	}
}
