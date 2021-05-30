const dateNow = Date.now();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let stars = 0;
// slider
function slider() {
	const navImg = document.querySelector('.nav-img');
	const navImgItems = document.querySelectorAll('.nav-img-item img');
	navImgItems.forEach((imgItem) => {
		imgItem.onclick = (e) => {
			const imgMains = document.querySelectorAll('.main-img img');
			removeActiveImg(imgMains);
			const numberImgActive = e.currentTarget.dataset.id;
			const imgActive = imgMains[numberImgActive - 1];
			showImgItem(imgActive);
		}
		const widthPattern = imgItem.offsetWidth;
		setHeightNav(imgItem, widthPattern);
	});
}

function removeActiveImg(imgMains) {
	imgMains.forEach((img) => {
		img.classList.remove('active');
	});
}
function showImgItem(img) {
	img.classList.add('active');
}
function setHeightNav(img, imgPattern) {
	img.style.height = `${imgPattern}px`;
}
// btn share
// btn socilas
const share = document.querySelector('.share');
const btnShare = share.querySelector('.btn-share');
btnShare.onclick = (e) => {
	e.stopPropagation();
	share.classList.toggle('active');
}
// all tab
const listNavLink = document.querySelectorAll('.all-tab a');
const tabPane = document.querySelectorAll('.tab-content .tab-pane');
removeDefault();
// nav tab with link tag
listNavLink.forEach(link => {
	link.onclick = (e) => {
		e.preventDefault();
		removeAllTab();
		removeAllTabPane();
		addActive(e);
	}
});
// navtab small 
function menuNav() {
	const listNavImg = document.querySelectorAll('.nav-item-small');
	listNavImg.forEach(img => {
		const tabpaneSmall = document.querySelectorAll('.tab-pane-small');
		img.onclick = (e) => {
			removeAllTabPaneSmall(tabpaneSmall);
			addActiveSmall(e);
		}
	});
}
// navtab order
const iconTab = document.querySelectorAll('.meal-icon-tab');
const tabpaneOrder = document.querySelectorAll('.tab-pane-order');
iconTab.forEach(icon => {
	icon.onclick = (e) => {
		removeAllTabOrder();
		removeAllTabPaneOrder();
		addActiveOrder(e);
	}
});

// fetch api
const currLink = window.location.href;
const currRest = currLink.slice(currLink.lastIndexOf('/') + 1);
// lay thong tin nha hang
const restaurantUrl = `/user/api/restaurants-view/${currRest}`;
// lay thong tin cac nha hang
const restaurantsUrl = '/user/api/restaurants-view';
// lay thong tin nguoi dung hien tai
const userUrl = '/user/api/user-detail';
// lay thong tin chu nha hang 
let mealsUrl, sellerUrl;
// lay thong tin reivews
const commentUrl = `/user/api/recipes/${currLink.slice(currLink.lastIndexOf('/') + 1)}/comments`;
start(); 

function start() {
	getRestaurant(restaurantUrl, renderRestaurantDetail);
	getRestaurantsPop(restaurantsUrl, renderRestaurantsPop);
	getCommentsMeal(commentUrl, renderCommentsMeal);
}
// restaurant
function getRestaurant(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderRestaurantDetail(restaurant) {
	const date = new Date(restaurant.createdAt);
	sellerUrl = `/user/api/user-detail/${restaurant.userId}`;
	mealsUrl = `/user/api/restaurants/${restaurant.slug}/meals-view`;
	const mainImg = document.querySelector('.main-img');
	const mainMenu = document.querySelector('.restaurant-menu-card .nav-tab');
	const navMenu = document.querySelector('.restaurant-menu-card .tab-content-small');
	const mainContainer = [], navContainer = [], galleryContainer = [], mainMenuContainer = [], navMenuContainer = [];
	const navImg = document.querySelector('.nav-img');
	const position = document.querySelector('.user-details .name-location p');
	const name = document.querySelector('.restaurant-details .name-location h4');
	const locationDet = document.querySelector('.restaurant-details .locationDet');
	const logo = document.querySelector('.restaurant-img img');
	const gallery = document.querySelector('.gallery');
	const numberGallery = document.querySelector('.number-gallery');
	const ratingRest = document.querySelector('.info-restaurant .right-side-btns');
	const numberPhoneRest = document.querySelector('.right-side-btns a');
	const publishDate =  document.querySelector('.published-left span');

	restaurant.photos.forEach((photo, index) => {
		let main, nav, photos;
		if(index == 0) {
			main = `
				<img class="active main-img-${index + 1}" src="${photo}" alt="slider">
			`;
		} else {
			main = `
				<img class="main-img-${index + 1}" src="${photo}" alt="slider">
			`;
		}
		nav = `
			<div class="nav-img-item">
				<img src="${photo}" alt="img item" data-id="${index + 1}">
			</div>
		`;
		photos = `
			<div class="gallery-item">
				<img src="${photo}" alt="img item">
				<a href="#">
					<i class="fa fa-plus-square-o" aria-hidden="true"></i>
				</a>
			</div>
		`;
		mainContainer.push(main);
		navContainer.push(nav);
		galleryContainer.push(photos);
	});
	// phone restaurant
	numberPhoneRest.href = `tel:${restaurant.phoneRestaurant}`;
	// Published
	publishDate.innerText = `Member since ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
	// stars restaurant
	countStar(ratingRest, restaurant.stars);
	// menu
	restaurant.menu.forEach((menu, index) => {
		let nav, main;
		if(index == 0) {
			nav = `
				<div class="tab-pane-small active" id="top-img">
					<img src="${menu}" alt="main img menu">
				</div>
			`;
			main = `
			<div class="nav-item-small" data-id="top-img">
				<img src="${menu}" alt="menu img">
			</div>
		`;
		} else {
			nav = `
				<div class="tab-pane-small" id="bottom-img">
					<img src="${menu}" alt="main img menu">
				</div>
			`;
			main = `
			<div class="nav-item-small" data-id="bottom-img">
				<img src="${menu}" alt="menu img">
			</div>
		`;
		}
		mainMenuContainer.push(main);
		navMenuContainer.push(nav);
	});
	mainImg.innerHTML = mainContainer.join('');
	navImg.innerHTML = navContainer.join('');
	mainMenu.innerHTML = mainMenuContainer.join('');
	navMenu.innerHTML = navMenuContainer.join('');
	gallery.innerHTML = galleryContainer.join('');
	numberGallery.innerText = `${restaurant.photos.length} photos`; 
	position.innerText = restaurant.position;
	name.innerText = restaurant.name;
	locationDet.innerText = restaurant.address;
	logo.src =  restaurant.logo;

	// about restaurant
	const nameRest = document.querySelector('.rest-name');
	const phoneNumber = document.querySelector('.number-phone');
	const phoneRest = document.querySelector('.rest-phone');
	const emailRest = document.querySelector('.rest-email');
	const cuisineRest = document.querySelector('.rest-cuisine');
	const openRest = document.querySelector('.rest-open');
	const closeRest = document.querySelector('.rest-close');
	const statusRest = document.querySelector('.rest-status');
	const cityRest = document.querySelector('.rest-city');
	const addressRest = document.querySelector('.rest-address');
	const discoutRest = document.querySelector('.rest-discout');

	nameRest.innerText = restaurant.name;
	phoneNumber.innerText = restaurant.phoneNumber;
	phoneRest.innerText = restaurant.phoneRestaurant;
	emailRest.innerText = restaurant.email;
	cuisineRest.innerText = restaurant.cuisine;
	openRest.innerText = restaurant.openHour;
	closeRest.innerText = restaurant.closeHour;
	statusRest.innerText = restaurant.open;
	cityRest.innerText = restaurant.city;
	addressRest.innerText = restaurant.address;
	discoutRest.innerText = '10% all meal';

	getSeller(sellerUrl, renderSeller);
	getMealsOfRestaurant(mealsUrl, renderMealsOfRestaurant);
	slider();
	menuNav();
}

// seller
function getSeller(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderSeller(user) {
	const avartar = document.querySelector('.user-details img');
	const name = document.querySelector('.user-details .name-location h4');
	const owner = document.querySelector('.rest-own');

	avartar.src = user.avartar;
	name.innerText = user.name;
	owner.innerText = user.name;
}

// meals of restaurant 
function getMealsOfRestaurant(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderMealsOfRestaurant(orderMeals) {
	const breakfast = document.querySelector('#breakfast .row');
	const lunch = document.querySelector('#lunch .row');
	const dinner = document.querySelector('#dinner .row');
	const cafe = document.querySelector('#cafe .row');
	const delivery = document.querySelector('#delivery .row');

	breakfast.innerHTML = '';
	lunch.innerHTML = '';
	dinner.innerHTML = '';
	cafe.innerHTML = '';
	delivery.innerHTML = '';
	orderMeals.forEach(meal => {
		if(meal.selectMeal.toLowerCase() == 'breakfast') {
			breakfast.appendChild(componentMeal(meal));
		} else if(meal.selectMeal.toLowerCase() == 'lunch') {
			lunch.appendChild(componentMeal(meal));
		} else if(meal.selectMeal.toLowerCase() == 'dinner') {
			dinner.appendChild(componentMeal(meal));
		} else if(meal.selectMeal.toLowerCase() == 'cafe') {
			cafe.appendChild(componentMeal(meal));
		} else {
			delivery.appendChild(componentMeal(meal));
		}
	});
}

function componentMeal(meal) {
	const div = document.createElement('div');
	div.className = 'col col-12 col-md-6';
	div.innerHTML = `
			<div class="meals">
				<img src="${meal.photos[0]}" alt="meal order">
				<div class="capiton-meals">
					<a href="/views/meals/${meal.slug}">
						<h3>${meal.name}</h3>
					</a>
					<div class="rating">
					</div>
					<p class="price">$${meal.price}.00</p>
				</div>
			</div>
	`;
	countStar(div, meal.stars);
	return div;
}
// pop restaurants
function getRestaurantsPop(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(error => console.log(error));
}

function renderRestaurantsPop(restaurants) {
	const listPopRest = document.querySelector('.list-pop-res');
	restaurants.forEach(restaurant => {
		listPopRest.appendChild(componentRestaurantPop(restaurant));
	});
}

function componentRestaurantPop(restaurant) {
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
				<div class="rating">
				</div>
		</div>
	`;
	countStar(li, restaurant.stars);
	return li;
}

// comments 
function getCommentsMeal(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderCommentsMeal(comments) {
	const mainComments = document.querySelector('.main-comments');
	mainComments.innerHTML = '';
	comments.forEach(comment => {
		mainComments.appendChild(componentCommentMeal(comment));
	});
}

function componentCommentMeal(comment) {
	const dateCmt = new Date(comment.createdAt).getTime();
	const hours = Math.floor(((dateNow - dateCmt) / (1000 * 60 * 60)) % 24);
	const div = document.createElement('div');
	div.className = 'comment';
	div.innerHTML =  `
			<div class="user-comment">
				<a href="/user-profile-view">
					<img src="${comment.avartar}" alt="user comment">
				<div class="name-rating">
					<a href="/user-profile-view">
					<h4 class="name">${comment.userName}</h4>
				</a>
				<div class="rating">
				</div>
				</div>	
			</div>
			<div class="reply-time">
				<p>
					<i class="fa fa-clock-o" aria-hidden="true"></i>
					${hours} hours ago
				</p>
			</div>
			<div class="desciption-comment">
				<p>${comment.content}</p>
			</div>
	`;
	countStar(div, comment.stars);
	return div;
}

const formComment = document.querySelector('.comment-post form');
const inputComment = formComment.querySelector('input');
formComment.addEventListener('submit', (e) => {
	e.preventDefault();
	const url = `/user/api/recipes/${currLink.slice(currLink.lastIndexOf('/') + 1)}`;
	const data = {
		content: inputComment.value,
		mealSlug: currLink.slice(currLink.lastIndexOf('/') + 1),
		stars: stars,
	}
	if(document.cookie == '') {
		window.location.replace('/user/login');
		return;
	}
	if(inputComment.value == '') {
		return;
	}
	fetch(url, {
		method: 'POST',
		headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
	})
	inputComment.value = '';
	getCommentsMeal(commentUrl, renderCommentsMeal);
});

// remove default a link
function removeDefault() {
	listNavLink.forEach(link => {
		link.onclick = (e) => e.preventDefault();
	});
}
// remove bnt tab link
function removeAllTab() {
	listNavLink.forEach(nav => { 
		nav.parentElement.classList.remove('active');
	});
}
// remove all tabpane link
function removeAllTabPane() {
	tabPane.forEach(tab => {
		tab.classList.remove('active');
	});
}
// add active link
function addActive(e) {
	const currentTab = e.target.parentElement;
	const showTab = document.getElementById(currentTab.dataset.id);
	showTab.classList.add('active');
	currentTab.classList.add('active');
}
// remove all tabpane small
function removeAllTabPaneSmall(tabpaneSmall) {
	tabpaneSmall.forEach(tab => {
		tab.classList.remove('active');
	});
}
// add active small
function addActiveSmall(e) {
	const currentTab = e.currentTarget;
	const showTab = document.getElementById(currentTab.dataset.id);
	showTab.classList.add('active');
}
// remove bnt tab order
function removeAllTabOrder() {
	iconTab.forEach(nav => { 
		nav.classList.remove('active');
	});
}
// remove all tabpane order
function removeAllTabPaneOrder() {
	tabpaneOrder.forEach(tab => {
		tab.classList.remove('active');
	});
}
// add active order
function addActiveOrder(e) {
	const currentTab = e.currentTarget;
	const showTab = document.getElementById(currentTab.dataset.id);
	showTab.classList.add('active');
	currentTab.classList.add('active');
}
// form book a table 
const selectTime = document.querySelector('#select-time');
const selectMember = document.querySelector('#select-member');
const dropdownMenuTime = selectTime.parentElement.querySelector('.dropdown-menu');
const dropdownMenuMember = selectMember.parentElement.querySelector('.dropdown-menu');
const dropdownMenuTimeItem = dropdownMenuTime.querySelectorAll('li');
const dropdownMenuMemberItem = dropdownMenuMember.querySelectorAll('li');
// Time select
selectTime.onclick = (e) => {
	e.preventDefault();
	selectTime.parentElement.classList.toggle('active');
};
dropdownMenuTime.onclick = (e) => {
	selectTime.innerText = e.target.innerText;
	selectTime.parentElement.classList.remove('active');
	removeAllActiveMenuItem(dropdownMenuTimeItem);
	addActiveMenuItem(e.target);
}
// Member select
selectMember.onclick = (e) => {
	e.preventDefault();
	selectMember.parentElement.classList.toggle('active');
};
dropdownMenuMember.onclick = (e) => {
	selectMember.innerText = e.target.innerText;
	selectMember.parentElement.classList.remove('active');
	removeAllActiveMenuItem(dropdownMenuMemberItem);
	addActiveMenuItem(e.target);
}
// function select
function removeAllActiveMenuItem(menu) {
	menu.forEach(item => {
		item.classList.remove('active');
	});
} 
function addActiveMenuItem(item) {
	item.classList.add('active');
}
// count stars
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
	}container.push(`<span>${numberStar}.0</span>`);
	stars.innerHTML = container.join('');
}
// your rating
const slRating = document.querySelector('.select-rating .rating');
const starSelect = slRating.querySelectorAll('i');
slRating.onclick = (e) => {
	const numberStar = e.target.dataset.id;
	stars = numberStar;
	yourRating(numberStar);
}
function yourRating(numberStar) {
	starSelect.forEach((star, index) => {
		if(index < numberStar) {
			star.style.color = 'orange';
		} else {
			star.style.color = 'rgb(0 0 0 / 55%)';
		}
	}); 
}
