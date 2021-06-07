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
// check email valid
const checkEmail = () => {
	let valid = false;
	const parent = email.parentElement;
	const val = email.value;
	if(!isRequired(val)) {
		valid = isError(parent, 'Email is can\'t blank');
	} else {		
		valid = isSuccess(parent);
	}
	return valid; 
};

// check password
const checkPassword = () => {
	let valid = false;
	const parent = password.parentElement;
	const val = password.value;
	if(!isRequired(val)) {
		valid = isError(parent, 'Password is can\'t blank');
	} else {		
		valid = isSuccess(parent);
	}
	return valid;
};
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
const form = document.querySelector('.form');
const email = form.querySelector('input[name="email"]'); 
const password = form.querySelector('input[name="password"]');

form.addEventListener('submit', e => {
	const checkEmailValid = checkEmail();
	const checkPasswordValid = checkPassword();
	let valid = checkEmailValid && checkPasswordValid;
	if(!valid) {
		e.preventDefault();
	}
});

form.addEventListener('input', debounce(function(e) {
	switch (e.target.id) {
		case 'email-phoneNumber':
			checkEmail();
			break;
		case 'password':
			checkPassword();
			break;
	};
}));
