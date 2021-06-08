// loadding 
window.onload = function () {
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
	if (topRight.offsetHeight > topItem.offsetHeight + 2) {
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
window.addEventListener('click', () => {
	accName.classList.remove('active');
	dropdown.classList.remove('active');
	accName1.classList.remove('active');
	dropdown1.classList.remove('active');
});
window.addEventListener('resize', () => {
	positionTopbar();
});

const bars = document.querySelector('.bars');
bars.onclick = () => {
	navbarContainerCenter.classList.toggle('active-right');
}
const btnClose = document.querySelector('.navbar-center .btn-close');
btnClose.onclick = () => {
	navbarContainerCenter.classList.remove('active-right');
}