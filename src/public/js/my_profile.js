// side bar starts
const navItem = document.querySelectorAll('.side-bar .nav-item a');
const tabPane = document.querySelectorAll('.tab-content .tab-pane');
showTabContent(navItem, tabPane);


// function

function showTabContent(navItem, tabPane) {
	navItem.forEach(nav => {
		nav.onclick = (e) => {
			e.preventDefault();
			removeActiveNavTab(navItem);
			removeActiveTabPane(tabPane);
			const parentNav = e.currentTarget.parentElement;
			const idTabPane = parentNav.dataset.id;
			const showTabPane = document.querySelector('#' + idTabPane);
			parentNav.classList.add('active');
			showTabPane.parentElement.classList.add('active');
		};
	});
}

function removeActiveNavTab(navItem) {
	navItem.forEach(nav => {
		nav.parentElement.classList.remove('active');
	});
}

function removeActiveTabPane(tabPane) {
	tabPane.forEach(tab => {
		tab.classList.remove('active');
	});
}