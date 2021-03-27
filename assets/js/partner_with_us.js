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

// list partners starts
const listPartners = [
	{
		id: 1,
		img: '1',
		nameRes: 'Pane & Vino',
		country: 'Rome, Italy',
		location: '1450 Washington Ave, Miami Beach',
		type: 'Dinner',
		online: true,
		openClose: '5.30PM to 12.00PM (Mon-Sun)',
		cuisine: 'Italian, Healthy',
		feature: 'Delivery',
		discount: '10% of on all orders',
		review: '5.0'
	},
	{
		id: 2,
		img: '2',
		nameRes: 'Spice Symphony',
		country: 'New York, United States',
		location: '50th Street Between 3rd avenue and, Lexington Ave',
		type: 'Cafe’s',
		online: false,
		openClose: '11.00AM to 3.00PM (Mon-Sun)',
		cuisine: 'Coffee cafe\'s',
		feature: 'N/A',
		discount: '20% of on all orders',
		review: '4.5'
	},
	{
		id: 3,
		img: '3',
		nameRes: 'Westwood Carvery',
		country: 'Hill District, Sydney Australia',
		location: 'Sco 123 Main Road, Hill District',
		type: 'Casual Dining',
		online: true,
		openClose: '9.00AM to 12PM (Mon-Sun)',
		cuisine: 'Chinese',
		feature: 'Treading',
		discount: '20% of on all orders',
		review: '3.5'
	},
	{
		id: 4,
		img: '4',
		nameRes: 'Bestro Bar',
		country: 'New York, United States',
		location: '222-10 Northern Blvd, Bayside',
		type: 'Bars',
		online: true,
		openClose: '6.00PM to 1.00AM (Mon-Sun)',
		cuisine: 'Drinks & Beer Restaurants',
		feature: 'Treading',
		discount: '10% of on all orders',
		review: '4.0'
	},
	{
		id: 5,
		img: '5',
		nameRes: 'Hot Chilli Restaurant',
		country: 'New York, United States',
		location: '98-18 Rockaway Blvd, Ozone Park',
		type: 'Casual Dining',
		online: false,
		openClose: '4.00AM to 10.00PM (Mon-Sun)',
		cuisine: 'Drinks & Beer Restaurants',
		feature: 'Treading',
		discount: '20% of on all orders',
		review: '4.5'
	},
	{
		id: 6,
		img: '6',
		nameRes: 'Barbecue Restaurant',
		country: 'New York, United States',
		location: '4210 18th Ave, Brooklyn',
		type: 'Casual Dining',
		online: true,
		openClose: '9.00AM to 3.00PM (Mon-Sun)',
		cuisine: 'Lunch, Breakfast, Dinner',
		feature: 'Treading',
		discount: '10% of on all orders',
		review: '4.5'
	},
	
];
const partners = document.querySelector('.list-partners');
listPartners.forEach((partner) => {
	const div = document.createElement('div');
	div.className = 'parners-section';
	div.innerHTML = `
		<div class="partners-bar">
			<div class="partners-top">
				<a href="#">
					<img src="assets/images/partner-${partner.img}.jpg" alt="logo partners">
				</a>
				<div class="partner-info">
					<a href="#">
						<h4>${partner.nameRes}</h4>
					</a>
					<div class="country">${partner.country}</div>
					<div class="location">
						<i class="fa fa-map-marker" aria-hidden="true"></i>
						${partner.location}
					</div>
					<div class="btn">
						<button>Partner</button>
						<p>${partner.type}</p>
					</div>
				</div>
				<div class="on-off">
					<p>
						<i class="fa fa-circle" aria-hidden="true"></i>
						<span>Online</span>
					</p>
				</div>
			</div>
			<div class="partners-middle">
				<div class="text">
					<ul>
						<li>Open - Close: ${partner.openClose}</li>
						<li>Cuisines: ${partner.cuisine}</li>
						<li>Featured: ${partner.feature}</li>
						<li>Discount: ${partner.discount}</li>
						<li>Reviews:
							<div class="stars">
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<i class="fa fa-star" aria-hidden="true"></i>
								<span>${partner.review}</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="bookmark">
					<i class="fa fa-bookmark-o" aria-hidden="true"></i>
					<span>bookmark</span>
				</div>
			</div>
			<div class="partners-bottom">
				<ul class="links">
					<li>
						<a href="#">
							<i class="fa fa-phone" aria-hidden="true"></i>
							Call now
						</a>
					</li>
					<li class="order-now">
						<a href="#">
							<i class="fa fa-cart-plus" aria-hidden="true"></i>
							Order now
						</a>
					</li>
					<li>
						<a href="#">
							<i class="fa fa-book" aria-hidden="true"></i>
							View menu
						</a>
					</li>
				</ul>
			</div>
		</div>
	`;
	countStar(div, partner.review);
	onlineOrOffline(div, partner.online)
	partners.appendChild(div);
});
// list partners ends
// list popular starts
const listPopular = [
	{
		id: 1,
		img: '1',
		name: 'Pane & Vino',
		country: 'Rome, Italy',
		star: '5.0'
	},
	{
		id: 2,
		img: '2',
		name: 'Spice Symphony',
		country: 'United States',
		star: '4.0'
	},
	{
		id: 3,
		img: '3',
		name: 'Westwood Carvery',
		country: 'Sydney Australia',
		star: '3.0'
	},
	{
		id: 4,
		img: '4',
		name: 'Hot Chilli Restaurant',
		country: 'United States',
		star: '2.0'
	},
	{
		id: 5,
		img: '5',
		name: 'Barbecue Restaurant',
		country: 'New York',
		star: '1.0'
	},
	
];
const popular = document.querySelector('.list-pop-res');
listPopular.forEach((pop) => {
	const li = document.createElement('li');
	li.innerHTML = `
		<a href="#">
			<img src="assets/images/partner-${pop.img}.jpg" alt="popular">
		</a>
		<div class="caption">
			<a href="#">
				<h4>${pop.name}</h4>
			</a>
			<p>${pop.country}</p>
				<div class="stars">
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<span>${pop.star}</span>
				</div>
		</div>
	`;
	countStar(li, pop.star);
	popular.appendChild(li);
});
// list popular ends
// count star
function countStar(parent, numberStar) {
	const stars = parent.querySelectorAll('.stars i');
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
function onlineOrOffline(parent, state) {
	const i = parent.querySelector('.on-off');
	const orderNow = parent.querySelector('.links .order-now a');
	console.log(orderNow);
	if(state) {
		i.style.color = 'orange';
	} else {
		i.style.color = 'grey';
		orderNow.classList.add('not-active');
	}
}