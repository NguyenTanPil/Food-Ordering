// side bar starts
const avartar = document.querySelector('#input-upload-avartar');
const background = document.querySelector('#input-upload-background');
avartar.onchange = (e) => changeFileName(e);
background.onchange = (e) => changeFileName(e);
// confirmDelete();

// fetch api
const userUrl = '/user/api/user-detail';
start();
// function

function changeFileName(input) {
	input = input.currentTarget;
	const index = input.value.lastIndexOf('\\');
	const file = input.value.slice(index + 1);
	const nextElement = input.nextElementSibling;
	const displayNameFile = nextElement.querySelector('.form-control');
	displayNameFile.innerText = file;
}

function confirmDelete() {
	const btnFirstDel = document.querySelector('.first-delelte');
	const modal = document.querySelector('.modal-confirm-remove-account');
	const iconCloseModal = modal.querySelector('.icon i');
	const btnCloseModal = modal.querySelector('.close-btn');
	const password = document.querySelector('#delete-account');
	btnFirstDel.onclick = () => {
		if (password.value) {
			modal.style.display = 'block';
		}
	}
	iconCloseModal.onclick = () => {
		modal.style.display = 'none';
	}
	btnCloseModal.onclick = () => {
		modal.style.display = 'none';
	}
}

function start() {
	getUser(userUrl, renderUser);
}

function getUser(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderUser(user) {
	const background = document.querySelector('.profile-bg img');
	const avartar = document.querySelector('.avt-name-local .avatar img');
	const name = document.querySelector('.name-location .name');
	const location = document.querySelector('.name-location .locationDet');
	const avartarEdit = document.querySelector('.profile .avatar img');
	const backgroundEdit = document.querySelector('.profile .background img');
	const nameEdit = document.querySelector('#full-name');
	const locationEdit = document.querySelector('#location-living');
	const descriptionEdit = document.querySelector('#description-video');
	const emailEdit = document.querySelector('#email');
	const phoneEdit = document.querySelector('#phone-number');

	background.src = user.background;
	avartar.src = user.avartar;
	name.innerText = user.name;
	location.innerText = user.location;
	avartarEdit.src = user.avartar;
	backgroundEdit.src = user.background;
	nameEdit.value = user.name;
	locationEdit.value = user.location;
	descriptionEdit.innerText = user.description;
	emailEdit.innerText = user.email;
	phoneEdit.value = user.phone;
}
