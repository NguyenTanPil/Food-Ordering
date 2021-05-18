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
saveSelectMeal(selectMeal.innerText);
saveSelectOffer(selectOffer.innerText);

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

// Add data temp => Chinh sua bang du lieu trong mongoose sau

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

