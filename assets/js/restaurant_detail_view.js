// slider
const navImg = document.querySelector('.nav-img');
const navImgItems = document.querySelectorAll('.nav-img-item img');
const imgMains = document.querySelectorAll('.main-img img');
navImgItems.forEach((imgItem) => {
	imgItem.onclick = (e) => {
		removeActiveImg();
		const numberImgActive = e.currentTarget.dataset.id;
		const imgActive = imgMains[numberImgActive - 1];
		showImgItem(imgActive);
	}
	const widthPattern = imgItem.offsetWidth;
	setHeightNav(imgItem, widthPattern);
});

function removeActiveImg() {
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
const listNavImg = document.querySelectorAll('.nav-item-small');
const tabpaneSmall = document.querySelectorAll('.tab-pane-small');
listNavImg.forEach(img => {
	img.onclick = (e) => {
		removeAllTabPaneSmall();
		addActiveSmall(e);
	}
});
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
function removeAllTabPaneSmall() {
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
const slRating = document.querySelector('.select-rating .rating');
const starSelect = slRating.querySelectorAll('i');
slRating.onclick = (e) => {
	const numberStar = e.target.dataset.id;
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
// all meals 
const listBreakfastMeals = [
	{
		id: 1,
		img: 'breakfast-meal-1.jfif',
		title: 'Sunny side egg in Toast',
		stars: '4.0',
		price: '5'
	},
	{
		id: 2,
		img: 'breakfast-meal-2.jfif',
		title: 'Waffle pancake',
		stars: '4.5',
		price: '6'
	},
	{
		id: 3,
		img: 'breakfast-meal-3.jfif',
		title: 'Toasted wheat bread',
		stars: '2.5',
		price: '7'
	},
	{
		id: 4,
		img: 'breakfast-meal-4.jfif',
		title: 'Brawn and white pastry',
		stars: '2.0',
		price: '8'
	},
	{
		id: 5,
		img: 'breakfast-meal-5.jfif',
		title: 'Boiled eggs and toast',
		stars: '5.0',
		price: '9'
	},
	{
		id: 6,
		img: 'breakfast-meal-6.jfif',
		title: 'Pancake with blueberry',
		stars: '3.5',
		price: '24'
	},
	{
		id: 7,
		img: 'breakfast-meal-7.jfif',
		title: 'Assorted variant',
		stars: '3.0',
		price: '13'
	},
	{
		id: 8,
		img: 'breakfast-meal-8.jfif',
		title: 'Sliced bread',
		stars: '4.5',
		price: '11'
	}
];
const listLunchMeals = [
	{
		id: 1,
		img: 'lunch-meal-1.jfif',
		title: 'Meat and vegetable salad',
		stars: '4.0',
		price: '5'
	},
	{
		id: 2,
		img: 'lunch-meal-2.jfif',
		title: 'Cooked food',
		stars: '4.5',
		price: '6'
	},
	{
		id: 3,
		img: 'lunch-meal-3.jfif',
		title: 'Chicken bites',
		stars: '2.5',
		price: '7'
	},
	{
		id: 4,
		img: 'lunch-meal-4.jfif',
		title: 'Egg and cooked rice',
		stars: '2.0',
		price: '8'
	},
	{
		id: 5,
		img: 'lunch-meal-5.jfif',
		title: 'Meat with sauce',
		stars: '5.0',
		price: '9'
	},
	{
		id: 6,
		img: 'lunch-meal-6.jfif',
		title: 'Assorted variant',
		stars: '3.5',
		price: '24'
	},
	{
		id: 7,
		img: 'lunch-meal-7.jfif',
		title: 'Vagetable salad',
		stars: '3.0',
		price: '13'
	},
	{
		id: 8,
		img: 'lunch-meal-8.jfif',
		title: 'Green salad',
		stars: '4.5',
		price: '11'
	}
];
const listDinnerMeals = [
	{
		id: 1,
		img: 'dinner-meal-1.jfif',
		title: 'Egg and cook rice',
		stars: '4.0',
		price: '5'
	},
	{
		id: 2,
		img: 'dinner-meal-2.jfif',
		title: 'Cooked chicken',
		stars: '4.5',
		price: '6'
	},
	{
		id: 3,
		img: 'dinner-meal-3.jfif',
		title: 'Beef stir-fried',
		stars: '2.5',
		price: '7'
	},
	{
		id: 4,
		img: 'dinner-meal-4.jfif',
		title: 'Bites beef',
		stars: '2.0',
		price: '8'
	},
	{
		id: 5,
		img: 'dinner-meal-5.jfif',
		title: 'Italian Pasta Full Plate',
		stars: '5.0',
		price: '9'
	},
	{
		id: 6,
		img: 'dinner-meal-6.jfif',
		title: 'Humburger',
		stars: '3.5',
		price: '24'
	},
	{
		id: 7,
		img: 'dinner-meal-7.jfif',
		title: 'Fired meat with vegetable',
		stars: '3.0',
		price: '13'
	},
	{
		id: 8,
		img: 'dinner-meal-8.jfif',
		title: 'Full food',
		stars: '4.5',
		price: '11'
	}
];
const listCafes = [
	{
		id: 1,
		img: 'cafe-1.jfif',
		title: 'Coffee latte',
		stars: '4.0',
		price: '5'
	},
	{
		id: 2,
		img: 'cafe-2.jfif',
		title: 'Black coffee',
		stars: '4.5',
		price: '6'
	},
	{
		id: 3,
		img: 'cafe-3.jfif',
		title: 'Cold brew coffee',
		stars: '2.5',
		price: '7'
	},
	{
		id: 4,
		img: 'cafe-4.jfif',
		title: 'Irish coffee',
		stars: '2.0',
		price: '8'
	},
	{
		id: 5,
		img: 'cafe-5.jfif',
		title: 'Latte macchiato',
		stars: '5.0',
		price: '9'
	},
	{
		id: 6,
		img: 'cafe-6.jfif',
		title: 'Ristretto',
		stars: '3.5',
		price: '24'
	},
	{
		id: 7,
		img: 'cafe-7.jfif',
		title: 'Espresso lungo',
		stars: '3.0',
		price: '13'
	},
	{
		id: 8,
		img: 'cafe-8.jfif',
		title: 'Affogato',
		stars: '4.5',
		price: '11'
	}
];
const listDeliveryMeals = [
	{
		id: 1,
		img: 'delivery-1.jfif',
		title: 'Fried fries',
		stars: '4.0',
		price: '5'
	},
	{
		id: 2,
		img: 'delivery-2.jfif',
		title: 'Slice cucumber and carots',
		stars: '4.5',
		price: '6'
	},
	{
		id: 3,
		img: 'delivery-3.jfif',
		title: 'Sushi',
		stars: '2.5',
		price: '7'
	},
	{
		id: 4,
		img: 'delivery-4.jfif',
		title: 'Cooked mussels',
		stars: '2.0',
		price: '8'
	},
	{
		id: 5,
		img: 'delivery-5.jfif',
		title: 'Pasta dish',
		stars: '5.0',
		price: '9'
	},
	{
		id: 6,
		img: 'delivery-6.jfif',
		title: 'Vagetable with yellow sauce',
		stars: '3.5',
		price: '24'
	},
	{
		id: 7,
		img: 'delivery-7.jfif',
		title: 'Green and brawn vegetable',
		stars: '3.0',
		price: '13'
	},
	{
		id: 8,
		img: 'delivery-8.jfif',
		title: 'Green and white labeled pack',
		stars: '4.5',
		price: '11'
	}
];
const breakfastMeals = document.querySelector('#breakfast .row');
createOrderOnlineMeals(breakfastMeals, listBreakfastMeals);
const lunchMeals = document.querySelector('#lunch .row');
createOrderOnlineMeals(lunchMeals, listLunchMeals);
const dinnerMeals = document.querySelector('#dinner .row');
createOrderOnlineMeals(dinnerMeals, listDinnerMeals);
const cafes = document.querySelector('#cafe .row');
createOrderOnlineMeals(cafes, listCafes);
const delilveryMeals = document.querySelector('#delivery .row');
createOrderOnlineMeals(delilveryMeals, listDeliveryMeals);
function createOrderOnlineMeals(typeMeal, listMeals) {
	listMeals.forEach(meal => {
		const div = document.createElement('div');
		div.className = 'col col-12 col-md-6';
		div.innerHTML = `
			<div class="meals">
				<img src="assets/images/${meal.img}" alt="meal order">
				<div class="capiton-meals">
					<a href="meal-detail.html">
						<h3>${meal.title}</h3>
					</a>
					<div class="rating">
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star" aria-hidden="true"></i>
						<i class="fa fa-star-o" aria-hidden="true"></i>
						<span>${meal.stars}</span>
					</div>
					<p class="price">$${meal.price}.00</p>
				</div>
			</div>
		`;
		countStar(div, meal.stars);
		typeMeal.appendChild(div);
	});
}
// list popular starts
const listPopular = [
	{
		id: 1,
		img: '1',
		name: 'Pane & Vino',
		country: 'Rome, Italy',
		star: '5.0'
	},
	{
		id: 2,
		img: '2',
		name: 'Spice Symphony',
		country: 'United States',
		star: '4.0'
	},
	{
		id: 3,
		img: '3',
		name: 'Westwood Carvery',
		country: 'Sydney Australia',
		star: '3.0'
	},
	{
		id: 4,
		img: '4',
		name: 'Hot Chilli Restaurant',
		country: 'United States',
		star: '2.0'
	},
	{
		id: 5,
		img: '5',
		name: 'Barbecue Restaurant',
		country: 'New York',
		star: '1.0'
	},
	
];
const popular = document.querySelector('.list-pop-res');
listPopular.forEach((pop) => {
	const li = document.createElement('li');
	li.innerHTML = `
		<a href="#">
			<img src="assets/images/partner-${pop.img}.jpg" alt="popular">
		</a>
		<div class="caption">
			<a href="#">
				<h4>${pop.name}</h4>
			</a>
			<p>${pop.country}</p>
				<div class="rating">
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<span>${pop.star}</span>
				</div>
		</div>
	`;
	countStar(li, pop.star);
	popular.appendChild(li);
});
// list popular ends