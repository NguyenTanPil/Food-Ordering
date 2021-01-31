// loading starts
window.onload = function() {
	document.querySelector('.loading').style.display = 'none';
}
// loading ends
// places starts
new Splide( '.browse-places .splide', {
	type: 'loop',
	perPage: 6,
	perMove: 1,
	autoplay: 'true',
	breakpoints: {
		576: {
			perPage: 1,
		},
		768: {
			perPage: 2,
		},
		1200: {
			perPage: 4,
		},
	}
}).mount();
// places ends
// restaurants starts
new Splide( '.restaurant .splide', {
	type: 'loop',
	perPage: 5,
	perMove: 1,
	breakpoints: {
		576: {
			perPage: 1,
		},
		992: {
			perPage: 2,
		},
		1200: {
			perPage: 3,
		},
		1400: {
			perPage: 4,
		}
	}
}).mount();
// restaurants ends
// order food online starts
Vue.component('food-items', {
	props: ['obj'],
	template: `
		<div class="card">
			<div class="card-img-top position-relative">
				<img :src="obj.img" alt="meal">
				<a href="#" class="theme"></a>
			</div>
			<div class="content position-relative">
				<div class="top-text">
					<div class="logo-img">
						<img :src="obj.logo" alt="logo">
					</div>
					<div class="text">
						<div class="heading">
							<h4>
								<a href="#" class="text-white">{{obj.text_heading}}</a>
							</h4>
						</div>
						<div class="sub-heading">
							<h5>
								<a href="#" class="text-dark">{{obj.sub_heading}}</a>
							</h5>
						</div>
					</div>
					<p>{{obj.prices}}</p>
				</div>
				<div class="bottom-text">
					<div class="delivery">
						<i class="fa fa-shopping-cart" aria-hidden="true"></i>
						Delivery Free : {{obj.delivery}}
					</div>
					<div class="time">
						<i class="fa fa-clock-o" aria-hidden="true"></i>
						Delivery Time : {{obj.time}}
					</div>
					<div class="feed-back">
						<div class="stars">
							<i class="fa fa-star" aria-hidden="true"></i>
							<i class="fa fa-star" aria-hidden="true"></i>
							<i class="fa fa-star" aria-hidden="true"></i>
							<i class="fa fa-star" aria-hidden="true"></i>
							<i class="fa fa-star" aria-hidden="true"></i>
						</div>
						<span>4.5</span>
						<div class="commnents">
							<a href="#">
								<i class="fa fa-comment" aria-hidden="true"></i>
								{{obj.comments}}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	`
});
var vue = new Vue({
	el: '.app',
	data: {
		listFood: [
		{
			id: 1,
			img: 'assets/images/meal-1.jpg',
			logo: 'assets/images/logo-img-1.jpg',
			text_heading: 'Bonn Burgur',
			sub_heading: 'Rooster',
			prices: '$5.00',
			delivery: 'Free',
			time: '30 Min',
			comments: '05'
		},
		{
			id: 2,
			img: 'assets/images/meal-2.jpg',
			logo: 'assets/images/logo-img-2.jpg',
			text_heading: 'Two Burgurs',
			sub_heading: 'Chef House',
			prices: '$4.00',
			delivery: 'Free',
			time: '15 Min',
			comments: '02'
		},
		{
			id: 3,
			img: 'assets/images/meal-3.jpg',
			logo: 'assets/images/logo-img-3.jpg',
			text_heading: 'Large Cheese Pizza...',
			sub_heading: 'Limon Resto',
			prices: '$12.00',
			delivery: 'Free',
			time: '20 Min',
			comments: '08'
		},
		{
			id: 4,
			img: 'assets/images/meal-4.jpg',
			logo: 'assets/images/logo-img-4.jpg',
			text_heading: 'Hakka Noodles',
			sub_heading: 'Ledbery',
			prices: '$5.00',
			delivery: 'Free',
			time: '05 Min',
			comments: '17'
		},
		{
			id: 5,
			img: 'assets/images/meal-5.jpg',
			logo: 'assets/images/logo-img-5.jpg',
			text_heading: 'Cappuccino Coffee',
			sub_heading: 'Organice cafe',
			prices: '$2.00',
			delivery: 'Free',
			time: '20 Min',
			comments: '44'
		},
		{
			id: 6,
			img: 'assets/images/meal-6.jpg',
			logo: 'assets/images/logo-img-6.jpg',
			text_heading: 'Choclate Cake',
			sub_heading: 'Chef House',
			prices: '$8.00',
			delivery: 'Free',
			time: '12 Min',
			comments: '01'
		},
		{
			id: 7,
			img: 'assets/images/meal-7.jpg',
			logo: 'assets/images/logo-img-7.jpg',
			text_heading: 'Indian Dosa',
			sub_heading: 'Indian Resto',
			prices: '$10.00',
			delivery: 'Free',
			time: '35 Min',
			comments: '07'
		},
		{
			id: 8,
			img: 'assets/images/meal-8.jpg',
			logo: 'assets/images/logo-img-8.jpg',
			text_heading: 'Double Tikki Burgur',
			sub_heading: 'Rooster',
			prices: '$6.00',
			delivery: 'Free',
			time: '10 Min',
			comments: '78'
		},
		
		]
	}
})
// order food online ends