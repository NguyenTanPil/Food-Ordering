const fromTime = document.querySelector('.from-time');
const toTime = document.querySelector('.to-time');
const optionCuisines = document.querySelector('.option-cuisines');
const optionTags = document.querySelector('.option-tags');

const selectTimeFrom = document.querySelector('.select-time-from');
const selectTimeTo = document.querySelector('.select-time-to');
const selectCuisines = document.querySelector('.select-cuisines');
const selectTags = document.querySelector('.select-tags');

const fromTimeItems = fromTime.querySelectorAll('.select-item');
const toTimeItems = toTime.querySelectorAll('.select-item');
const cuisineItems = optionCuisines.querySelectorAll('.select-item');
const tagItems = optionTags.querySelectorAll('.select-item');

const listTimes = document.querySelector('.list-times');
const addTimeBtn = document.querySelector('.add-time-btn');
const slAll = document.querySelector('#select-all');
const checkbox = document.querySelectorAll('.information .radio-item');

// dropdown select time
selectTimeFrom.onclick =  () => {
	fromTime.classList.toggle('active');
};
fromTime.onclick = (e) => {
	selectTimeFrom.innerText = e.target.innerText;
	fromTime.classList.remove('active');
	removeAllActiveMenuItem(fromTimeItems);
	addActiveMenuItem(e.target);
};

selectTimeTo.onclick =  () => {
	toTime.classList.toggle('active');
}

toTime.onclick = (e) => {
	selectTimeTo.innerText = e.target.innerText;
	toTime.classList.remove('active');
	removeAllActiveMenuItem(toTimeItems);
	addActiveMenuItem(e.target);
};

// add list times
addTimeBtn.onclick = async() => {
	await addTime(listTimes);
	removeTimes(listTimes);
}

// select all
slAll.onclick = () => {
	selectAllDay(slAll.checked);
}

// select cuisines
selectCuisines.onclick =  () => {
	optionCuisines.classList.toggle('active');
}

optionCuisines.onclick = (e) => {
	selectCuisines.innerText = e.target.innerText;
	optionCuisines.classList.remove('active');
	removeAllActiveMenuItem(cuisineItems);
	addActiveMenuItem(e.target);
	saveCuisine(selectCuisines.innerText);
};

// select tags
selectTags.onclick =  () => {
	optionTags.classList.toggle('active');
}

optionTags.onclick = (e) => {
	selectTags.innerText = e.target.innerText;
	optionTags.classList.remove('active');
	removeAllActiveMenuItem(tagItems);
	addActiveMenuItem(e.target);
	saveTag(selectTags.innerText);
};

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

// save by input hidden
saveHours(selectTimeFrom.innerText, selectTimeTo.innerText);
saveCuisine(selectCuisines.innerText);
saveTag(selectTags.innerText);


// function 
function removeAllActiveMenuItem(menu) {
	menu.forEach(item => {
		item.classList.remove('active');
	});
}

function addActiveMenuItem(item) {
	item.classList.add('active');
}

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
			unCheckDay.parentElement.querySelector('.state').classList.remove('active');
			unCheckDay.checked =  false;
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

// form valid
// succes function
function isSuccess(formGroup) {
	formGroup.classList.remove('error');
	formGroup.classList.add('success');
	const nofitication = formGroup.querySelector('.nofitication');
	nofitication.style.height = '0';
	return true;
}
// succes error
function isError(formGroup, nofi) {
	formGroup.classList.remove('success');
	formGroup.classList.add('error');
	const nofitication = formGroup.querySelector('.nofitication');
	const span = formGroup.querySelector('span');
	span.innerText = nofi;
	nofitication.style.height = `${span.getBoundingClientRect().height + 12}px`;
	return false;
}
// check empty
const isRequired = (value) => (value === '' ? false : true);
// check empty
function checkRequired(elem, field) {
	let valid = false;
	const parent = elem.parentElement;
	const val = elem.value;
	if(!isRequired(val)) {
		valid = isError(parent, `${field} is can\'t blank`);
	} else {		
		valid = isSuccess(parent);
	}
	return valid; 
}
// debounce
const debounce = (func, delay = 1000) => {
	let timeoutId;
	return (...agrs) => {
		// Cancel the previous timer
		if(timeoutId) {
			clearTimeout(timeoutId);
		}
		// set up new timer
		timeoutId = setTimeout(() => {
			func.apply(null, agrs);
		}, delay);
	};
};
// form valid
const form =  document.querySelector('.add-restaurant form');
const name = form.querySelector('input[name="name"]'); 
const stars = form.querySelector('input[name="stars"]');
const city = form.querySelector('input[name="city"]');
const email = form.querySelector('input[name="email"]');
const phoneNumber = form.querySelector('input[name="phoneNumber"]');
const phoneRestaurant = form.querySelector('input[name="phoneRestaurant"]');
const website = form.querySelector('input[name="website"]');
const address = form.querySelector('input[name="address"]');

form.addEventListener('submit', e => {
	const validName = checkRequired(name, 'Name');
	const validCity = checkRequired(city, 'City');
	const validStars = checkRequired(stars, 'Stars');
	const validEmail = checkRequired(email, 'Email');
	const validPhoneNumber = checkRequired(phoneNumber, 'Phone Number');
	const validPhoneRest = checkRequired(phoneRestaurant, 'Phone Restaurant');
	const validWebsite = checkRequired(website, 'Website');
	const validAddress = checkRequired(address, 'Address');
	let valid = validName && validCity && validStars && validEmail && validPhoneNumber && validPhoneRest && validWebsite && validAddress;
	if(!valid) {
		e.preventDefault();
	}
});

form.addEventListener('input', debounce(function(e) {
	switch (e.target.id) {
		case 'name-restaurant':
			checkRequired(name, 'Name');
			break;
		case 'search-city':
			checkRequired(city, 'City');
			break;
		case 'stars':
			checkRequired(stars, 'Stars');
			break;
		case 'email':
			checkRequired(email, 'Email');
			break;
		case 'phoneNumber':
			checkRequired(phoneNumber, 'Phone Number');
			break;
		case 'phoneRestaurant':
			checkRequired(phoneRestaurant, 'Phone Restaurant');
			break;
		case 'websiteRestaurant':
			checkRequired(website, 'Website');
			break;
		case 'address-restaurant':
			checkRequired(address, 'Address');
			break;
	};
}));
