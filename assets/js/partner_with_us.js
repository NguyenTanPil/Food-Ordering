const play = document.querySelector('.play-btn i');
const overlay = document.querySelector('.video .modal-overlay');
play.onclick = (e) => {
	e.stopPropagation();
	overlay.classList.add('active');
	document.body.style.overflow = 'hidden';
};
window.addEventListener('click', () => {
	accName.classList.remove('active');
	dropdown.classList.remove('active');
	accName1.classList.remove('active');
	dropdown1.classList.remove('active');
	dropdown2.classList.remove('active');
	formSearch.classList.remove('active');
	hiddenMenu.style.display = 'none';
	searchMenu.style.display = 'inline-block';
	overlay.classList.remove('active');
	document.body.style.overflow = 'auto';
});