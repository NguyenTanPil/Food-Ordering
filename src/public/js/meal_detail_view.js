 // slider
const navImg = document.querySelector('.nav-img');
const quantity =  document.querySelector('.quantity');
const priceEl =  document.querySelector('.price-meal');
const totalPrice =  document.querySelector('.total-price span');

// quantity 
chooseQuantity(quantity);

// fetch api
const currentLink = window.location.href;
const currMeal = currentLink.slice(currentLink.lastIndexOf('/') + 1);
const mealDetailUrl = `/user/api/meals/meal-detail/${currMeal}`;
const userUrl = '/user/api/user-detail';
let sellerUrl, restaurantUrl;
start();

// function
function slider() {
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
// your rating
function yourRating(numberStar) {
	starSelect.forEach((star, index) => {
		if(index < numberStar) {
			star.style.color = 'orange';
		} else {
			star.style.color = 'rgb(0 0 0 / 55%)';
		}
	}); 
}
// select quantity
function chooseQuantity(quantity) {
	const down = quantity.querySelector('.down-qty');
	const up = quantity.querySelector('.up-qty');
	const inputQty = quantity.querySelector('input');
	const priceMeal = priceEl.innerText;
	const quantityInput = document.querySelector('.quantityInput');
	const payment =  document.querySelector('.payment');
	down.onclick = () => {
		if(inputQty.value > 1) {
			inputQty.value--;
			totalPrice.innerText = parseInt(inputQty.value) * parseInt(priceMeal);
			quantityInput.value = inputQty.value;
			payment.value = totalPrice.innerText;
		}
	}
	up.onclick = () => {
		inputQty.value++;
		totalPrice.innerText = parseInt(inputQty.value) * parseInt(priceMeal);
		quantityInput.value = inputQty.value;
		payment.value = totalPrice.innerText;
	}
}

async function start() {
	getMealDetail(mealDetailUrl, renderMealDetail);
	getUser(userUrl, renderUser);
}

// meal detail 
function getMealDetail(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderMealDetail(mealDetail) {
	sellerUrl = `/user/api/user-detail/${mealDetail.userId}`;
	restaurantUrl = `/user/api/restaurants-view/${mealDetail.slugRestaurant}`;
	console.log(restaurantUrl);
	const nameMeal = document.querySelector('.name-meal h1');
	const descriptionMeal = document.querySelector('.description p');
	const priceMeal = document.querySelector('.price-meal');
	const totalMeal = document.querySelector('.total-price span');
	const form = document.querySelector('.meal-detail');
	const inputMealName = form.querySelector('input[name="name"]');
	const inputMealId = form.querySelector('input[name="mealId"]');
	const inputMealImg = form.querySelector('input[name="mealImg"]');
	const inputMealPrice = form.querySelector('input[name="price"]');
	const inputMealPayment = form.querySelector('input[name="payment"]');
	const mainImg = document.querySelector('.main-img');
	const navImg = document.querySelector('.nav-img');
	const linkRestaurant = document.querySelector('.restaurant-details .name-location a');

	nameMeal.innerText = mealDetail.name;
	if(mealDetail.description) {
		descriptionMeal.innerText = mealDetail.description;
	} else {
		descriptionMeal.innerText = 'No description';
	}
	
	priceMeal.innerText = mealDetail.price;
	totalMeal.innerText = mealDetail.price;
	form.action = `/user/restaurant/${mealDetail.slugRestaurant}/meal/${mealDetail.slug}/order-meal`;
	inputMealName.value = mealDetail.name;
	inputMealId.value = mealDetail._id;
	inputMealImg.value = mealDetail.photos[0];
	inputMealPrice.value = mealDetail.price;
	inputMealPayment.value = mealDetail.price;
	linkRestaurant.href = `/user/restaurant/${mealDetail.slugRestaurant}`;

	const renderMainImg = mealDetail.photos.map((img, index) => {
		if(index == 0) {
			return `
				<img class="active main-img-${index + 1}" src="${img}" alt="slider">
			`;
		} else {
			return `
				<img class="main-img-${index + 1}" src="${img}" alt="slider">
			`; 
		}
	});
	mainImg.innerHTML = renderMainImg.join('');

	const renderNavImg = mealDetail.photos.map((img, index) => {
		return `
			<div class="nav-img-item">
				<img src="${img}" alt="img item" data-id="${index + 1}">
			</div>
		`; 
	});
	navImg.innerHTML = renderNavImg.join('');
	slider();
	getSeller(sellerUrl, renderSeller);
	getRestaurantDetail(restaurantUrl, renderRestaurantDetail);
}

// restaurant detail
function getRestaurantDetail(url, callback) {
	fetch(url)
		.then(data => data.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderRestaurantDetail(restaurant) {
	const logo = document.querySelector('.restaurant-img img');
	const name = document.querySelector('.info-restaurant .name-location h4');
	const location = document.querySelector('.info-restaurant .name-location span');
	const position = document.querySelector('.user-details .name-location p');
	const sellerRest = document.querySelector('input[name="sellerRest"]');

	logo.src = restaurant.logo;
	name.innerText = restaurant.name;
	location.innerText = restaurant.city;
	position.innerText = restaurant.position;
	sellerRest.value =  restaurant.name;
}

// user detail
function getSeller(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderSeller(user) {
	const avartar = document.querySelector('.user-details img');
	const name = document.querySelector('.user-details .name-location h4');
	const linkUser = document.querySelectorAll('.user-details a');

	avartar.src = user.avartar;
	name.innerText = user.name;
	linkUser.forEach(link => {
		link.href = '/user';
	});
}

// user detail
function getUser(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderUser(user) {
	const userNameInput = document.querySelector('input[name="userName"]');
	const userIdInput = document.querySelector('input[name="userId"]');
	const locationInput = document.querySelector('input[name="location"]');

	userNameInput.value =  user.name
	userIdInput.value = user.userId;
	locationInput.value = user.location;
}
