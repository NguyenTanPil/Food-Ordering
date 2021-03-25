// all partner starts
const checkbox = document.querySelectorAll('.all-partners .check-item');
const radio = document.querySelectorAll('.all-partners .accordion:nth-child(7) .check-item');
checkbox.forEach((item) => {
	const input = item.querySelector('input');
	const state = item.querySelector('.state');
	input.addEventListener('click', (e) => {
		if(input.type == 'radio') {
			radio.forEach((rb) => {
				const rbState = rb.querySelector('.state');
				rbState.classList.remove('active');
			});
		}
		state.classList.toggle('active');
		});
});

const accordions = document.querySelectorAll('.all-partners .accordion');
accordions.forEach((accordion) => {
	const btnFilter = accordion.querySelector('.filters-dropdown');
	const containerCollapse = accordion.querySelector('.container-collapse');
	const collapse = accordion.querySelector('.collapse');
	btnFilter.addEventListener('click', (e) => {
		const collapseHeight = collapse.getBoundingClientRect().height;
		const collapseContainerHeight = containerCollapse.getBoundingClientRect().height;
		if(collapseContainerHeight == 0) {
			containerCollapse.style.height = `${collapseHeight}px`;
			btnFilter.style.paddingBottom = '0';
		} else {
			containerCollapse.style.height = `0`;
			btnFilter.style.paddingBottom = '1rem';
		}
	});
});
// all partner ends