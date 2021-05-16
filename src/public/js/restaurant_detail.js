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
const checkbox = document.querySelectorAll('.information .radio-item');
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

saveHours(selectTimeFrom.innerText, selectTimeTo.innerText);
saveCuisine(selectCuisine.innerText);
saveTag(selectTag.innerText);

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
	if(input.checked == true) {
		state.classList.add('active');
	}
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
// Add data temp => Chinh sua bang du lieu trong mongoose sau
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
				<img src="/images/${meal.img}" alt="meal order">
				<div class="capiton-meals">
					<a href="/meal-detail">
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

