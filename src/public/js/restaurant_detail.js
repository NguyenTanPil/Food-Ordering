// side bar starts
const navItem = document.querySelectorAll('.side-bar .nav-item a');
const tabPane = document.querySelectorAll('.tab-content .tab-pane');
const clickShow = document.querySelector('.about-heading span');
const modal = document.querySelector('.modal');
const closeBtn = modal.querySelector('.icon');
const dropdownBtn = document.querySelectorAll('.form-group .dropdown-btn');
const listTimes = document.querySelector('.list-times');
const addTimeBtn = document.querySelector('.add-time-btn');
const slAll = document.querySelector('#select-all');
const selectTimeFrom = document.querySelector('.select-time-from');
const selectTimeTo = document.querySelector('.select-time-to');
const selectCuisine = document.querySelector('.btn-cuisine');
const selectTag = document.querySelector('.btn-tag');
const selectMeal = document.querySelector('.btn-meal');
const selectOffer = document.querySelector('.btn-offer');
const checkbox = document.querySelectorAll('.information .radio-item');
let addPhotosMeal = document.querySelector('.add-photos-meal');
const selectPhotos = document.querySelector('.select-photos');
const clearAllPhotos = document.querySelector('.clear-all-photos');
const mealsResContainer = document.querySelector('#request-orders .table-body');
const mealsHisContainer = document.querySelector('#orders-history .table-body');

showTabContent(navItem, tabPane);
clickShow.onclick = () => {
	showModal();
}
closeBtn.onclick = () => {
	closeModal();
}
// add list times
addTimeBtn.onclick = async() => {
	await addTime(listTimes);
	removeTimes(listTimes);
}

// select all
slAll.onclick = () => {
	selectAllDay(slAll.checked);
}

// add photos meal
addPhotosOnchange(addPhotosMeal);

// clear all photos
clearAllPhotos.onclick = () => {
	const addPhotos = document.createElement('input');
	addPhotos.className = 'field-input file-input add-photos-meal';
	addPhotos.type = 'file';
	addPhotos.multiple = true;
	addPhotos.name = 'photos';
	addPhotosMeal.replaceWith(addPhotos);
	selectPhotos.innerHTML = '';
	addPhotosMeal = addPhotos;
	addPhotosOnchange(addPhotosMeal);
}
// fetch api
const currentLink = window.location.href;
const currRest = currentLink.slice(currentLink.lastIndexOf('/') + 1);
const mealsUrl = '/user/api/meals';
const orderMealsUrl = '/user/api/order-meals';
const restaurantsUrl = `/user/api/restaurant-detail/${currRest}`;
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

const iconTab = document.querySelectorAll('.meal-icon-tab');
const tabpaneOrder = document.querySelectorAll('.tab-pane-order');
iconTab.forEach(icon => {
	icon.onclick = (e) => {
		removeAllTabOrder();
		removeAllTabPaneOrder();
		addActiveOrder(e);
	}
});
function removeAllTabOrder() {
	iconTab.forEach(nav => { 
		nav.classList.remove('active');
	});
}

function removeAllTabPaneOrder() {
	tabpaneOrder.forEach(tab => {
		tab.classList.remove('active');
	});
}

function addActiveOrder(e) {
	const currentTab = e.currentTarget;
	const showTab = document.getElementById(currentTab.dataset.id);
	showTab.classList.add('active');
	currentTab.classList.add('active');
}

function showModal() {
	modal.classList.add('active');
}

function closeModal() {
	modal.classList.remove('active');
}

function dropdownMenu(btns) {
	btns.forEach(btn => {
		btn.onclick = (e) => {
			const dropDownMenu = e.currentTarget.parentElement.querySelector('.dropdown-menu');
			showDropdown(dropDownMenu);
			closeDropdown(dropDownMenu, e.currentTarget);
		}
	});
}
dropdownMenu(dropdownBtn);
function showDropdown(menu) {
	menu.classList.toggle('active');
}

function closeDropdown(menu, btn) {
	const dropDownItems = menu.querySelectorAll('.dropdown-item');
	dropDownItems.forEach(item => {
		item.onclick = (e) => {
			menu.classList.remove('active');
			btn.innerText = e.currentTarget.innerText;
			removeAllDropdownItems(dropDownItems);
			addActiveDropdownItem(e.currentTarget);
			saveHours(selectTimeFrom.innerText, selectTimeTo.innerText);
			saveCuisine(selectCuisine.innerText);
			saveTag(selectTag.innerText);
			saveSelectMeal(selectMeal.innerText);
			saveSelectOffer(selectOffer.innerText);
		};
	});
}

function removeAllDropdownItems(items) {
	items.forEach(item => {
		item.classList.remove('active');
	});
}

function addActiveDropdownItem(item) {
	item.classList.add('active');
}

function removeActiveRadio(radios) {
	radios.forEach((rb) => {
		const state = rb.querySelector('.state');
		state.classList.remove('active');
	});
}

// checkbox and radio 
checkbox.forEach((item) => {
	const input = item.querySelector('input');
	const state = item.querySelector('.state');
	input.addEventListener('click', (e) => {
		if(input.type == 'radio') {
			const radios = item.parentElement.querySelectorAll('.radio-item');
			removeActiveRadio(radios);
		}
		state.classList.toggle('active');
		});
});
function addTime(list) {
	// reset list
	list.innerHTML = '';
	// select days
	let days = document.getElementsByName('days[]');
	days = Array.prototype.slice.call(days);
	const seletctDay = days.filter((day) => day.checked == true);
	// select hours open - close
	const openHour = selectTimeFrom.innerText;
	const closeHour = selectTimeTo.innerText;
	saveHours(selectTimeFrom.innerText, selectTimeTo.innerText);
	// Add time items
	seletctDay.forEach((day) => {
		const div =  document.createElement('div');
		div.className = 'time-item';
		div.innerHTML = `
			<div class="day">${day.value}</div>
			<div class="open-close">${openHour} to ${closeHour}</div>
			<button class="remove-add-time" type="button">
				<i class="fa fa-window-close-o" aria-hidden="true"></i>
			</button>
		`;
		list.appendChild(div);
	})
}

function removeTimes(list) {
	const btnRemoves = list.querySelectorAll('i');
	btnRemoves.forEach((btn) => {
		btn.onclick = (e) => {
			const timeItemElem = e.currentTarget.parentElement.parentElement;
			const elemRemove = timeItemElem.querySelector('.day').innerText.toLowerCase();
			const unCheckDay = document.getElementById(elemRemove);
			unCheckDay.checked =  false;
			unCheckDay.parentElement.querySelector('.state').classList.remove('active');
			timeItemElem.remove();
			slAll.checked = false;
			slAll.parentElement.querySelector('.state').classList.remove('active');
		}
	});
}

function selectAllDay(status) {
	let days = document.getElementsByName('days[]');
	days = Array.prototype.slice.call(days);
	days.forEach(day => {
		day.checked = status;
		if(status) {
			day.parentElement.querySelector('.state').classList.add('active');
		} else {
			day.parentElement.querySelector('.state').classList.remove('active');
		}
	});
}

function removeActiveRadio(radios) {
	radios.forEach((rb) => {
		const state = rb.querySelector('.state');
		state.classList.remove('active');
	});
}

function saveHours(openHour, closeHour) {
	const open =  document.querySelector('.input-hidden-open');
	const close =  document.querySelector('.input-hidden-close');
	open.value = openHour;
	close.value =  closeHour;
}
function saveCuisine(cuisine) {
	const inputCuisine = document.querySelector('.input-hidden-cuisine');
	inputCuisine.value = cuisine;
}

function saveTag(tag) {
	const inputTag = document.querySelector('.input-hidden-tag');
	inputTag.value = tag;
}

function saveSelectMeal(meal) {
	const inputMeal = document.querySelector('.select-meal');
	inputMeal.value = meal;
}
function saveSelectOffer(offer) {
	const inputOffer = document.querySelector('.offer-meal');
	inputOffer.value = offer;
}

// add photo when onchange
function addPhotosOnchange(addPhotos) {
	addPhotos.onchange = (e) => {
		const imgs = e.target.files;
		for(let i = 0; i < imgs.length; i++) {
			const img = document.createElement('img');
			img.src = URL.createObjectURL(imgs[i]);
			img.alt = "preview-img";
			img.className = 'img-preview';
			selectPhotos.appendChild(img);
		}
	}
}

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

// fetch api

function start() {
	getOrderMeals(mealsUrl, renderOrderMeals);
	getRestaurantPhotos(restaurantsUrl, renderRestaurantPhotos);
	getRestaurantDetail(restaurantsUrl, renderRestaurantDetail);
	getMealsRequest(orderMealsUrl, renderMealsRequest);
	getOrdersHistory(orderMealsUrl, renderOrdersHistory);
}
// meals
function getOrderMeals(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderOrderMeals(orderMeals) {
	const breakfast = document.querySelector('#breakfast .row');
	const lunch = document.querySelector('#lunch .row');
	const dinner = document.querySelector('#dinner .row');
	const cafe = document.querySelector('#cafe .row');
	const delivery = document.querySelector('#delivery .row');

	let getBreakfast = [];
	let getLunch = [];
	let getDinner = [];
	let getCafe = [];
	let getDelivery = [];
	orderMeals.forEach(meal => {
		if(meal.selectMeal.toLowerCase() == 'breakfast') {
			getBreakfast.push(componentMeal(meal));
		} else if(meal.selectMeal.toLowerCase() == 'lunch') {
			getLunch.push(componentMeal(meal));
		} else if(meal.selectMeal.toLowerCase() == 'dinner') {
			getDinner.push(componentMeal(meal));
		} else if(meal.selectMeal.toLowerCase() == 'cafe') {
			getCafe.push(componentMeal(meal));
		} else {
			getDelivery.push(componentMeal(meal));
		}
	});
	
	breakfast.innerHTML = getBreakfast.join('');
	lunch.innerHTML = getLunch.join('');
	dinner.innerHTML = getDinner.join('');
	cafe.innerHTML = getCafe.join('');
	delivery.innerHTML = getDelivery.join('');
}

function componentMeal(meal) {
	return `
		<div class="col col-12 col-md-6">
			<div class="meals">
				<img src="${meal.photos[0]}" alt="meal order">
				<div class="capiton-meals">
					<a href="/user/restaurant/${meal.slugRestaurant}/meal/${meal.slug}">
						<h3>${meal.name}</h3>
					</a>
					<div class="rating">
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star-o" aria-hidden="true"></i>
						<span>4.5</span>
					</div>
					<p class="price">$${meal.price}.00</p>
				</div>
			</div>
		</div>
	`;
}

// photos restaurant
function getRestaurantPhotos(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderRestaurantPhotos(restaurant) {
	const photos = restaurant.photos;
	const allPhotos = document.querySelector('#photos .gallery');
	const allPhotosRight = document.querySelector('.pf-gallery');
	const photosUser = photos.map(photo => {
		return componentRestaurantPhotos(photo);
	});
	const photosRight = photos.map(photo => {
		return componentPhotosRight(photo);
	});
	
	allPhotos.innerHTML = photosUser.join('');
	allPhotosRight.innerHTML = photosRight.join('');
}

function componentRestaurantPhotos(photo) {
	return `
		<div class="gallery-item">
			<img src="${photo}" alt="img item">
			<a href="#">
				<i class="fa fa-plus-square-o" aria-hidden="true"></i>
			</a>
		</div>
	`;
}

// restaurant change
function getRestaurantDetail(url, callback) {
	fetch(url)
		.then(response =>  response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderRestaurantDetail(restaurant) {
	// select element
	const name = document.querySelector('#name-restaurant');
	const city = document.querySelector('#search-city');
	const email = document.querySelector('#email');
	const phoneNumber = document.querySelector('#phoneNumber');
	const phoneRestaurant = document.querySelector('#phoneRestaurant');
	const websiteRestaurant = document.querySelector('#websiteRestaurant');
	const address = document.querySelector('#address-restaurant');
	const position = document.querySelectorAll('input[name="position"]');
	const status = document.querySelectorAll('input[name="open"]');
	const days = document.querySelectorAll('input[name="days[]"]');
	const services = document.querySelectorAll('input[name="services[]"]');
	const alcohol = document.querySelectorAll('input[name="alcohol"]');
	const seating = document.querySelectorAll('input[name="seating"]');
	const payment = document.querySelectorAll('input[name="payment"]');
	
	// assign value
	name.value = restaurant.name;
	city.value = restaurant.city;
	email.value = restaurant.email;
	phoneNumber.value = restaurant.phoneNumber;
	phoneRestaurant.value = restaurant.phoneRestaurant;
	websiteRestaurant.value = restaurant.website;
	address.value = restaurant.address;
	// assign postion
	position.forEach(pos => {
		if(pos.value == restaurant.position) {
			pos.checked = true;
			pos.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign status
	status.forEach(st => {
		if(st.value == restaurant.open) {
			st.checked = true;
			st.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign days
	days.forEach(day => {
		if(restaurant.days.some(time => (time == day.value))) {
			day.checked = true;
			day.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign from time
	selectTimeFrom.innerText = restaurant.openHour;
	activeDropdown(selectTimeFrom, restaurant.openHour);
	// assign to time
	selectTimeTo.innerText = restaurant.closeHour;
	activeDropdown(selectTimeTo, restaurant.closeHour);
	// assign services
	services.forEach(service => {
		if(restaurant.services.some(ser => (ser == service.value))) {
			service.checked = true;
			service.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign alcohol
	alcohol.forEach(al => {
		if(al.value == restaurant.alcohol) {
			al.checked = true;
			al.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign seating
	seating.forEach(seat => {
		if(seat.value == restaurant.seating) {
			seat.checked = true;
			seat.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign cuisine
	selectCuisine.innerText = restaurant.cuisine;
	activeDropdown(selectCuisine, restaurant.cuisine);
	selectTag.innerText = restaurant.tag;
	// assign tag
	activeDropdown(selectTag, restaurant.tag);
	// assign payment
	payment.forEach(pay => {
		if(pay.value == restaurant.payment) {
			pay.checked = true;
			pay.parentElement.querySelector('.state').classList.add('active');
		}
	});
	// assign value input hidden
	saveHours(selectTimeFrom.innerText, selectTimeTo.innerText);
	saveCuisine(selectCuisine.innerText);
	saveTag(selectTag.innerText);
	saveSelectMeal(selectMeal.innerText);
	saveSelectOffer(selectOffer.innerText);
}

function activeDropdown(btn, value) {
	const menu = btn.parentElement.querySelector('.dropdown-menu');
	const items = menu.querySelectorAll('.dropdown-item');
	items.forEach(item => {
		if(item.innerText == value) {
			addActiveDropdownItem(item);
		}
	});
}

// order meals request
function getMealsRequest(url, callback) {
	fetch(url)
		.then(response =>  response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderMealsRequest(mealsRequest) {
	const mealsRes = mealsRequest.map(meal => {
		if(meal.completed == 'false') {
			return componentMealRequest(meal);
		}
	});
	mealsResContainer.innerHTML = mealsRes.join('');
}

function componentMealRequest(meal) {
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
					<button type="button" class="my-btn" onclick="acceptOrder('${meal._id}')">Accept
					</button>
				</div>
			</div>
		</div>
	`;
}

// order meals history
function getOrdersHistory(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderOrdersHistory(mealsHistory) {
	const mealsHis = mealsHistory.map(meal => {
		if(meal.completed == 'true' && meal.deleted == 'false') {
			return componentMealHis(meal);
		}
	});
	mealsHisContainer.innerHTML = mealsHis.join('');
}

function componentMealHis(meal) {
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
					<button type="button" class="my-btn">Finished
					</button>
					<button type="button" class="my-btn" onclick="deleteOrder('${meal._id}')">
						<i class="fa fa-trash" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		</div>
	`;
}

function acceptOrder(id) {
	const options = {
		method: 'PATCH',
		headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	  	completed: true
	  }),
	};
	fetch(`${orderMealsUrl}/${id}`, options)
		.then(response =>  response.json())
		.catch(err => console.log(err));
	getMealsRequest(orderMealsUrl, renderMealsRequest);
	getOrdersHistory(orderMealsUrl, renderOrdersHistory);
}

function deleteOrder(id) {
	const options = {
		method: 'PATCH',
		headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	  	deleted: true
	  }),
	};
	fetch(`${orderMealsUrl}/${id}`, options)
		.then(response =>  response.json())
		.catch(err => console.log(err));
	getOrdersHistory(orderMealsUrl, renderOrdersHistory);
}

function componentPhotosRight(photo) {
	return `
		<a href="#">
			<img src="${photo}" alt="img item">
		</a>
	`;
}