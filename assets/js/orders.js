// loading starts
window.onload = function() {
	document.querySelector('.loading').style.display = 'none';
}
const search = document.querySelector('.menu-sab:last-child');
const formSearch = search.querySelector('form');
const searchMenu = search.querySelector('.search-menu');
const hiddenMenu = search.querySelector('.hidden-menu');
searchMenu.addEventListener('click', (e) => {
	e.target.style.display = 'none';
	hiddenMenu.style.display = 'block';
	formSearch.classList.add('active');
});
hiddenMenu.addEventListener('click', (e) => {
	e.target.style.display = 'none';
	searchMenu.style.display = 'block';
	searchMenu.style.color = 'gray';
	formSearch.classList.remove('active');
});