// slider
const navImg = document.querySelector('.nav-img');
const navImgItems = document.querySelectorAll('.nav-img-item img');
const imgMains = document.querySelectorAll('.main-img img');
const share = document.querySelector('.share');
const btnShare = share.querySelector('.btn-share');
const quantity =  document.querySelector('.quantity');
const priceEl =  document.querySelector('.price-meal');
const totalPrice =  document.querySelector('.total-price span');

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

// btn share
// btn socilas
btnShare.onclick = (e) => {
	e.stopPropagation();
	share.classList.toggle('active');
}

chooseQuantity(quantity);

// function
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