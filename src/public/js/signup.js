const agree = document.querySelector('.agree');
const checkboxAgree = document.getElementById('agree');
checkboxAgree.onclick = () => {
	agree.classList.toggle('active');
}
// Form validation
const form = document.querySelector('.form form');
const name = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeat-password');
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
// length of input value
const isBetween = (length, min, max) => (length < min || length > max ? false : true);
// check isEmail
const isEmail = (email) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
// check password
const isPassword = (password) => {
	const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
	return re.test(password);
}
// check name valid
const checkName = () => {
	let valid = false;
	const parent = name.parentElement;
	const val = name.value;
	const min = 4;
	const max = 20;
	if(!isRequired(val)) {
		valid = isError(parent, 'Full name is can\'t blank');
	} else if(!isBetween(val.length, min, max)) {
		valid =  isError(parent, `Full name must be between ${min} and ${max} characters`);
	} else {		
		valid = isSuccess(parent);
	}
	return valid;
};
// check email valid
const checkEmail = () => {
	let valid = false;
	const parent = email.parentElement;
	const val = email.value;
	if(!isRequired(val)) {
		valid = isError(parent, 'Email is can\'t blank');
	} else if(!isEmail(val)) {
		valid =  isError(parent, `Email is not valid`);
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
	} else if(!isPassword(val)) {
		valid =  isError(parent, `Password has eight characters or longer. And it must contain 1 lowercase character, 1 uppercase character, 1 number, and at least one special character in this set (!@#$%^&*)`);
	} else {		
		valid = isSuccess(parent);
	}
	return valid;
};

// check repeat password
const checkRepeatPassword = () => {
	let valid = false;
	const parent = repeatPassword.parentElement;
	const val = repeatPassword.value;
	if(!isRequired(val)) {
		valid = isError(parent, 'Please enter the password again');
	} else if(!(val === password.value)) {
		valid =  isError(parent, `Repeat password does not match`);
	} else {		
		valid = isSuccess(parent);
	}
	return valid;
};
form.addEventListener('submit', (e) => {
	const checkNameValid = checkName();
	const checkEmailValid = checkEmail();
	const checkPasswordValid = checkPassword();
	const checkRepeatPasswordValid = checkRepeatPassword();
	let validation = checkNameValid && checkEmailValid && checkPasswordValid && checkRepeatPasswordValid;
	if(!validation) {
		e.preventDefault();
	}
});
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
form.addEventListener('input', debounce(function(e) {
	switch (e.target.id) {
		case 'full-name':
			checkName();
			break;
		case 'email':
			checkEmail();
			break;
		case 'password':
			checkPassword();
			break;
		case 'repeat-password':
			checkRepeatPassword();
			break;
	};
}));