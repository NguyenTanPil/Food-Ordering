// side bar starts
const navItem = document.querySelectorAll('.side-bar .nav-item a');
const tabPane = document.querySelectorAll('.tab-content .tab-pane');
const orderContainer = document.querySelector('#my-orders .table-body');
const historyOrderContainer = document.querySelector('#orders-history .table-body');
const restaurants = document.querySelector('.all-restaurants');
const videos = document.querySelector('.gallery');

showTabContent(navItem, tabPane);
// fetch api
const mealsUrl = '/user/api/order-meals';
const restaurantsUrl = '/user/api/restaurants';
const videosUrl = '/user/api/videos';
start();

// function

function showTabContent(navItem, tabPane) {
	navItem.forEach(nav => {
		nav.onclick = (e) => {
			e.preventDefault();
			removeActiveNavTab(navItem);
			removeActiveTabPane(tabPane);
			const parentNav = e.currentTarget.parentElement;
			const idTabPane = parentNav.dataset.id;
			const showTabPane = document.querySelector('#' + idTabPane);
			parentNav.classList.add('active');
			showTabPane.parentElement.classList.add('active');
		};
	});
}

function removeActiveNavTab(navItem) {
	navItem.forEach(nav => {
		nav.parentElement.classList.remove('active');
	});
}

function removeActiveTabPane(tabPane) {
	tabPane.forEach(tab => {
		tab.classList.remove('active');
	});
}
// fetch api
function deleteOrder(id) {
	const options = {
		method: 'DELETE',
		headers: {
	    'Content-Type': 'application/json',
	  },
	};
	fetch(`${mealsUrl}/${id}`, options)
		.then(response =>  response.json())
		.catch(err => console.log(err));
		getOrderMeals(mealsUrl, renderOrderMeals);
}

function updateOrder(id) {
	const options = {
		method: 'PATCH',
		headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	  	completed: true
	  }),
	};
	fetch(`${mealsUrl}/${id}`, options)
		.then(response =>  response.json())
		.catch(err => console.log(err));
		getOrderMeals(mealsUrl, renderOrderMeals);
}

function start() {
	getOrderMeals(mealsUrl, renderOrderMeals);
	getRestaurants(restaurantsUrl, renderRestaurants);
	getVideos(videosUrl, renderVideos);
}
// meals
function getOrderMeals(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderOrderMeals(orderMeals) {
	let order = [], history = [];
	orderMeals.forEach(meal => {
		if(meal.completed == 'false') {
			order.push(componentMeal(meal, 'trace'));
		} else {
			history.push(componentMeal(meal, 'finished'));
		}
	});
	orderContainer.innerHTML = order.join('');
	historyOrderContainer.innerHTML = history.join('');
}

function componentMeal(meal, btn) {
	let clickEvent = '';
	let deleteOrder = '';
	if(btn == 'trace') {
		clickEvent = `onclick="updateOrder('${meal._id}')"`;
	}
	return `
		<div class="table-row">
			<div class="td-content td-1">
				<img src="${meal.mealImg}" alt="my orders">
				<div class="name-rest">
					<h4>${meal.name}</h4>
					<p>${meal.sellerRest}</p>
				</div>
			</div>
			<div class="td-content td-2">
				<span>${meal.quantity}</span>
			</div>
			<div class="td-content td-3">
				<span>$${meal.payment}</span>
			</div>
			<div class="td-content td-4">
				<div class="action-btns">
					<button type="button" class="my-btn ${btn}" ${clickEvent}>${btn}
					</button>
					<button type="button" class="my-btn" onclick="deleteOrder('${meal._id}')">
						<i class="fa fa-trash" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		</div>
	`;
}
// restaurant
function getRestaurants(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderRestaurants(restaurantsUser) {
	const allRestaurants = restaurantsUser.map(restaurant => componentRestaurant(restaurant));
	restaurants.innerHTML = allRestaurants.join('');
}

function componentRestaurant(restaurant) {
	return `
		<div class="restaurant-item">
			<div class="card-restaurant">
				<a href="/user/restaurant/${restaurant.slug}">
				<img src="${restaurant.logo}" alt="img item">
				</a>
				<div class="description">
					<a href="/user/restaurant/${restaurant.slug}">${restaurant.name}</a>
					<p><i class="fa fa-map-marker" aria-hidden="true"></i>${restaurant.city}</p>
				</div>
				</div>
		</div>
	`;
}
// videos
function getVideos(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderVideos(videosUser) {
	const allVideos = videosUser.map(video => componentVideo(video));
	videos.innerHTML = allVideos.join('');
}

function componentVideo(video) {
	return `
		<div class="gallery-item">
			<img src="${video.thumbnail}" alt="img item">
			<a href="/recipe/recipe-details">
				<i class="fa fa-play-circle" aria-hidden="true"></i>
			</a>
		</div>
	`;
}