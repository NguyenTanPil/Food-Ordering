
// add time 
const addTime = document.querySelector('#add-times');
const addTimeBtn = addTime.querySelector('#add-time-btn');

addTimeBtn.onclick = () => {
	const days = addTime.querySelectorAll('[name="days[]"]');
	const openHour = addTime.querySelector("#open-hour .select-btn");
	const closeHour = addTime.querySelector("#close-hour .select-btn");
	const listTimes = addTime.querySelector('.list-times');

	addListTimes(days, openHour.innerText, closeHour.innerText, listTimes);
}

// add times
function addListTimes(days, open, close, listTimes) {
	days = Array.from(days);
	const selectedDays = days.filter(day => day.checked);

	const container = selectedDays.map(selectedDay => {
		return componentShowTime(selectedDay, open, close);
	});

	listTimes.innerHTML = container.join('');
}

function componentShowTime(time, open, close) {
	return `
		<div class="time-item">
			<div class="day">${time.value}</div>
			<div class="open-close">${open} to ${close}</div>
			<button class="remove-time-btn" onclick="removeTimes(this)" type="button">
				<i class="fa fa-window-close-o" aria-hidden="true"></i>
			</button>
		</div>
	`;
}

// remove times
function removeTimes(btn) {
	const timeItem = btn.parentElement;
	const dayName = timeItem.querySelector('.day');
	const days = Array.from(addTime.querySelectorAll('[name="days[]"]'));

	// remove day in list times
	timeItem.remove();

	// uncheck day in days
	const removeDay = days.find(day => day.id == dayName.innerText);
	const stateCheck = removeDay.nextElementSibling;
	removeDay.checked = false;
	stateCheck.classList.remove('active');

	// uncheck all day
	unCheckAllDays();
}

// select all days
function selectAllDays(btn) {
	const days = Array.from(addTime.querySelectorAll('[name="days[]"]'));
	if (btn.checked) {
		days.forEach(day => {
			day.checked = true;
			day.nextElementSibling.classList.add('active');
		});
	} else {
		days.forEach(day => {
			day.checked = false;
			day.nextElementSibling.classList.remove('active');
		});
	}
}

function unCheckAllDays() {
	const allBtn = document.querySelector('#select-all');
	allBtn.checked = false;
	allBtn.nextElementSibling.classList.remove('active');
}

function checkStateDay(state) {
	if (!state) {
		unCheckAllDays();
	}
}

// before click btn submit
const btnSubmition = document.querySelector('.sb-add-restaurant .btn');
btnSubmition.onclick = () => {
	// save input hidden before submit
	// open times
	const inputHiddenOpen = document.querySelector('#input-hidden-open');
	const openHour = document.querySelector('#open-hour .select-btn');
	saveInputHidden(openHour, inputHiddenOpen);

	// close times
	const inputHiddenClose = document.querySelector('#input-hidden-close');
	const closeHour = document.querySelector('#close-hour .select-btn');
	saveInputHidden(closeHour, inputHiddenClose);

	// cuisinnes
	const inputHiddenCuisinnes = document.querySelector('#input-hidden-cuisines');
	const cuisinnes = document.querySelector('#cuisines');
	saveInputHidden(cuisinnes, inputHiddenCuisinnes);

	// tags
	const inputHiddenTags = document.querySelector('#input-hidden-tags');
	const tags = document.querySelector('#tags');
	saveInputHidden(tags, inputHiddenTags);

}
