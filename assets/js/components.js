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
var vue1 = new Vue({
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
var vue2 = new Vue({
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
			<div class="card-img-top">
				<img :src="obj.img" alt="meal">
				<a href="#" class="theme"></a>
			</div>
			<div class="content">
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
var vue3 = new Vue({
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
// featured restaurants starts
Vue.component('feature-item', {
	props: ['obj'],
	template: `
		<div class="row">
			<div class="col-12 col-md-4">
				<div class="img-item">
					<img :src="obj.img" alt="Featured">
					<div class="info-img">
						<h4>{{obj.name_food}}</h4>
						<p>{{obj.name_restaurant}}</p>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-4">
				<div class="location-item text-center">
					<span class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
					<span class="text">{{obj.location_time}}</span>
				</div>
			</div>
			<div class="col-12 col-md-4">
				<div class="btn-item">
					<a href="#" class="btn my-btn" role="button" data-bs-toggle="button">View Menu</a>
				</div>
			</div>
		</div>
	`
});
var vue4 = new Vue({
	el: '.app-4',
	data: {
		listFeature: [
		{
			id: 1,
			img: 'assets/images/feature-1.jpg',
			name_food: 'Food Roster',
			name_restaurant: 'Indian Restaurant',
			location_time: 'New York City - 1569'
		},
		{
			id: 2,
			img: 'assets/images/feature-2.jpg',
			name_food: 'Chef House',
			name_restaurant: 'American Restaurant',
			location_time: 'Chicago City - 1560'
		},
		{
			id: 3,
			img: 'assets/images/feature-3.jpg',
			name_food: 'Rooster',
			name_restaurant: 'Indian Restaurant',
			location_time: 'Los Angeles City - 1561'
		},
		{
			id: 4,
			img: 'assets/images/feature-4.jpg',
			name_food: 'Limon Resto',
			name_restaurant: 'Australian Restaurant',
			location_time: 'Luan Don City - 1562'
		},
		{
			id: 5,
			img: 'assets/images/feature-5.jpg',
			name_food: 'Food Roster',
			name_restaurant: 'Ramen Bakery',
			location_time: 'Can Tho City - 1563'
		},
		]
	}
})
Vue.component('treading-item', {
	props: ['obj'],
	template: `
		<div class="row">
			<div class="col-7 col-md-6">
				<div class="img-item">
					<img :src="obj.img" alt="Featured">
					<div class="info-img">
						<h4>{{obj.name_food}}</h4>
						<p>Treading</p>
					</div>
				</div>
			</div>
			<div class="col-5 col-md-6">
				<div class="btn-item">
					<a href="#" class="my-btn" role="button" data-bs-toggle="button">View <span>Menu</span></a>
				</div>
			</div>
		</div>
	`
});
var vue5 = new Vue({
	el: '.app-5',
	data: {
		listTreading: [
		{
			id: 1,
			img: 'assets/images/feature-6.jpg',
			name_food: 'Steak Resto'
		},
		{
			id: 2,
			img: 'assets/images/feature-2.jpg',
			name_food: 'Meshi Restaurant'
		},
		{
			id: 3,
			img: 'assets/images/feature-8.jpg',
			name_food: 'Momo Resto'
		},
		{
			id: 4,
			img: 'assets/images/feature-1.jpg',
			name_food: 'Rooster'
		},
		{
			id: 5,
			img: 'assets/images/feature-3.jpg',
			name_food: 'Limon Bakery'
		},
		]
	}
})
// featured restaurants ends
// explore recipes starts
Vue.component('recipe-item', {
	props: ['obj'],
	template: `
		<a href="#">
			<div class="recipe-item">
				<img :src="obj.img" alt="">
				<div class="overlay">
					<h6>{{obj.recipe}}</h6>
					<p>{{obj.video}} Videos</p>
				</div>
			</div>
		</a>
	`
});
var vue6 = new Vue({
	el: '.app-6',
	data: {
		listRecipe: [
		{
			id: 1,
			img: 'assets/images/recipe_01.jpg',
			recipe: 'North Indian',
			video: '75'
		},
		{
			id: 2,
			img: 'assets/images/recipe_02.jpg',
			recipe: 'Fast Food',
			video: '105'
		},
		{
			id: 3,
			img: 'assets/images/recipe_03.jpg',
			recipe: 'Italian Food',
			video: '35'
		},
		{
			id: 4,
			img: 'assets/images/recipe_04.jpg',
			recipe: 'Chinese Food',
			video: '60'
		},
		{
			id: 5,
			img: 'assets/images/recipe_05.jpg',
			recipe: 'Street Food',
			video: '45'
		},
		{
			id: 6,
			img: 'assets/images/recipe_06.jpg',
			recipe: 'Bakery',
			video: '20'
		},
		]
	}
})
// explore recipes ends