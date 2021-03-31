const listWorkItem = [
	{
		id: 1,
		img: '1',
		title: 'Nearby',
		text: 'Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.'
	},
	{
		id: 2,
		img: '2',
		title: 'Cafes & More',
		text: 'Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.'
	},
	{
		id: 3,
		img: '3',
		title: 'Drinks & Nightlife',
		text: 'Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.'
	},
	{
		id: 4,
		img: '4',
		title: 'Desserts & Bakes',
		text: 'Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.'
	},
	{
		id: 5,
		img: '5',
		title: 'Upcoming Events',
		text: 'Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.'
	},
	{
		id: 6,
		img: '6',
		title: 'Newly Opened',
		text: 'Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.'
	}
];
const listWork = document.querySelector('.list-work');
listWorkItem.forEach((item) => {
	const div = document.createElement('div');
	div.className = 'col col-12 col-md-6 col-lg-4';
	div.innerHTML = `
		<div class="work-item">
			<div class="work-img">
				<a href="#">
					<img src="assets/images/place-${item.img}.svg" alt="work img">
				</a>
			</div>
			<div class="work-text">
				<a href="#">
					<h4>${item.title}</h4>
				</a>
				<p>${item.text}</p>
			</div>
		</div>
	`;
	listWork.appendChild(div);
 });
