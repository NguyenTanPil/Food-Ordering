// loadding 
window.onload = function() {
	document.querySelector('.loading').style.display = 'none';
}
// topbar starts
const accName = document.querySelector('.topbar-right .dropdown a');
const dropdown = document.querySelector('.topbar-right .dropdown .dropdown-menu');
accName.addEventListener('click', (e) => {
	e.stopPropagation();
	accName.classList.toggle('active');
	dropdown.classList.toggle('active');
});
function positionTopbar() {
	const topRight = document.querySelector('.topbar-right');
	const topItem = topRight.querySelector('.topbar-item');
	const topItemDrop = topRight.querySelector('.dropdown-menu');
	if(topRight.offsetHeight > topItem.offsetHeight + 2) {
		topItemDrop.style.left = '0';
		topItemDrop.style.right = 'auto';
	}
}
positionTopbar();
// menu starts
const navbarContainerCenter = document.querySelector('.container-navbar-center');
const accName1 = document.querySelector('.menu .dropdown a');
const dropdown1 = document.querySelector('.menu .dropdown .dropdown-menu');
accName1.addEventListener('click', (e) => {
	e.stopPropagation();
	e.preventDefault();
	accName1.classList.toggle('active');
	dropdown1.classList.toggle('active');
	navbarContainerCenter.classList.toggle('active');
});
// footer starts
const language = document.querySelector('.language .dropdown');
const dropdown2 = document.querySelector('.language .dropdown .dropdown-menu');
language.addEventListener('click', (e) => {
	e.stopPropagation();
	e.preventDefault();
	dropdown2.classList.toggle('active');
});
// menu search food
const search = document.querySelector('.navbar-end .nav-link:last-child');
const formSearch = search.querySelector('form');
const searchMenu = search.querySelector('.search-menu');
const hiddenMenu = search.querySelector('.hidden-menu');
searchMenu.addEventListener('click', (e) => {
	e.stopPropagation();
	e.target.style.display = 'none';
	hiddenMenu.style.display = 'inline-block';
	formSearch.classList.add('active');
});
hiddenMenu.addEventListener('click', (e) => {
	e.target.style.display = 'none';
	searchMenu.style.display = 'inline-block';
	searchMenu.style.color = 'gray';
	formSearch.classList.remove('active');
});
formSearch.addEventListener('click', (e) => {
	e.stopPropagation();
});
window.addEventListener('click', () => {
	accName.classList.remove('active');
	dropdown.classList.remove('active');
	accName1.classList.remove('active');
	dropdown1.classList.remove('active');
	dropdown2.classList.remove('active');
	formSearch.classList.remove('active');
	hiddenMenu.style.display = 'none';
	searchMenu.style.display = 'inline-block';
});
//navbar center
const myRow = document.querySelector('.my-row');
const myCol = document.querySelector('.my-col');
function changePositon() {
	let size = {
	  width: window.innerWidth || document.body.clientWidth
	};
	const status = myCol.querySelector('.container-navbar-center');
	if(size.width <= 992 && status) {
		myCol.removeChild(navbarContainerCenter);
		myRow.appendChild(navbarContainerCenter);
	} 
	if(size.width > 992 && !status) {
		myCol.insertBefore(navbarContainerCenter, myCol.childNodes[0]);
	}
};
changePositon();
window.addEventListener('resize', () => {
	changePositon();
	positionTopbar();
});
// show bars
const navbarCenter = document.querySelector('.navbar-center');
const bars = document.querySelector('.btn-bars');
bars.addEventListener('click', (e) => {
	e.stopPropagation();
	const parentHeight = navbarContainerCenter.getBoundingClientRect().height;
	const childHeight = navbarCenter.getBoundingClientRect().height;
	bars.classList.toggle('active');
	if(parentHeight == 0) {
		navbarContainerCenter.style.height = `${childHeight}px`;
	} else {
		navbarContainerCenter.style.height = '0';
	}
});

// search
const searchFoodHeader = document.querySelector('#search-food');
const formSearchFoodHeader = searchFoodHeader.parentElement;
formSearchFoodHeader.onsubmit = (e) => {
	let valueSearch = searchFoodHeader.value;
	valueSearch = valueSearch.toLowerCase().replaceAll(' ', '-');
	formSearchFoodHeader.action = `/views/meals/${valueSearch}`;
}