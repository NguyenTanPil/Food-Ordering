//-----------------------------------------------------------------------------------------
// brow places and quick food starts
Vue.component('items', {
	props: ['obj'],
	template: `
		<div class="places">
			<a href="#">
				<div class="places-icon">
					<img :src="obj.img" class="d-block mx-auto" alt="places logo">
				</div>
				<div class="places-text">
					{{obj.text}}
				</div>
			</a>
		</div>
	`
});
var vue = new Vue({
	el: '.app-1',
	data: {
		listPlaces: [
		{
			id: 1,
			img: 'assets/images/01.svg',
			text: 'Near by'
		},
		{
			id: 2,
			img: 'assets/images/02.svg',
			text: 'Cafes & More'
		},
		{
			id: 3,
			img: 'assets/images/03.svg',
			text: 'Drinks & Nightkise'
		},
		{
			id: 4,
			img: 'assets/images/04.svg',
			text: 'Desserts & Bakes'
		},
		{
			id: 5,
			img: 'assets/images/05.svg',
			text: 'Upcoming Events'
		},
		{
			id: 6,
			img: 'assets/images/06.svg',
			text: 'Newly Opened'
		},
		{
			id: 7,
			img: 'assets/images/01.svg',
			text: 'Near by'
		},
		{
			id: 8,
			img: 'assets/images/02.svg',
			text: 'Cafes & More'
		},
		{
			id: 9,
			img: 'assets/images/03.svg',
			text: 'Drinks & Nightkise'
		},
		{
			id: 10,
			img: 'assets/images/04.svg',
			text: 'Desserts & Bakes'
		},
		{
			id: 11,
			img: 'assets/images/05.svg',
			text: 'Upcoming Events'
		},
		{
			id: 12,
			img: 'assets/images/06.svg',
			text: 'Newly Opened'
		},
		
		]
	}
})
var vue = new Vue({
	el: '.app-2',
	data: {
		listMeals: [
		{
			id: 1,
			img: 'assets/images/meal-1.svg',
			text: 'Breakfast'
		},
		{
			id: 2,
			img: 'assets/images/meal-2.svg',
			text: 'Lunch'
		},
		{
			id: 3,
			img: 'assets/images/meal-3.svg',
			text: 'Dinner'
		},
		{
			id: 4,
			img: 'assets/images/meal-4.svg',
			text: 'Cafe\'s'
		},
		{
			id: 5,
			img: 'assets/images/meal-5.svg',
			text: 'Delivery'
		},
		{
			id: 6,
			img: 'assets/images/meal-1.svg',
			text: 'Breakfast'
		},
		{
			id: 7,
			img: 'assets/images/meal-2.svg',
			text: 'Lunch'
		},
		{
			id: 8,
			img: 'assets/images/meal-3.svg',
			text: 'Dinner'
		},
		{
			id: 9,
			img: 'assets/images/meal-4.svg',
			text: 'Cafe\''
		},
		{
			id: 10,
			img: 'assets/images/meal-5.svg',
			text: 'Delivery'
		},
		]
	}
})
// brow places and quick food ends
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