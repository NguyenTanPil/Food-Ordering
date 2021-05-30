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
	const span = nofitication.querySelector('span');
	span.innerText = nofi;
	nofitication.style.height = `${span.getBoundingClientRect().height + 12}px`;
	return false;
}
// check empty
const isRequired = (value) => (value === '' ? false : true);
// check empty
function checkRequired(elem, field) {
	let valid = false;
	let parent = elem.parentElement;
	if(parent.className == 'box') {
		parent = parent.parentElement;
	}
	const val = elem.value;
	if(!isRequired(val)) {
		valid = isError(parent, `${field} is can\'t blank`);
	} else {		
		valid = isSuccess(parent);
	}
	return valid; 
}
// form valid
const form =  document.querySelector('.upload-video form');
const title = form.querySelector('input[name="title"]'); 
const tags = form.querySelector('input[name="tags"]'); 
const link = form.querySelector('input[name="link"]');
const thumbnail = form.querySelector('input[name="thumbnail"]');
const description = form.querySelector('textarea');
form.addEventListener('submit', (e) => {
	const validTitle = checkRequired(title, 'Title');
	const validDescription = checkRequired(description, 'Description');
	const validTags = checkRequired(tags, 'Tags');
	const validLink = checkRequired(link, 'Link');
	const validThumbnail = checkRequired(thumbnail, 'Thumbnail');
	let valid = validTitle && validTags && validLink && validThumbnail && validDescription;
	if(!valid) {
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
		case 'title-video':
			checkRequired(title, 'Title');
			break;
		case 'description-video':
			checkRequired(description, 'Description');
			break;
		case 'tags-video':
			checkRequired(tags, 'Tags');
			break;
		case 'link-video':
			checkRequired(link, 'Link');
			break;
		case 'thumbnail-video':
			checkRequired(thumbnail, 'Thumbnail');
			break;
	};
}));
