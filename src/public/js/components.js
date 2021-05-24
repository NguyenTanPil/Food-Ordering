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
			img: '../images/01.svg',
			text: 'Near by'
		},
		{
			id: 2,
			img: '../images/02.svg',
			text: 'Cafes & More'
		},
		{
			id: 3,
			img: '../images/03.svg',
			text: 'Drinks & Nightkise'
		},
		{
			id: 4,
			img: '../images/04.svg',
			text: 'Desserts & Bakes'
		},
		{
			id: 5,
			img: '../images/05.svg',
			text: 'Upcoming Events'
		},
		{
			id: 6,
			img: '../images/06.svg',
			text: 'Newly Opened'
		},
		{
			id: 7,
			img: '../images/01.svg',
			text: 'Near by'
		},
		{
			id: 8,
			img: '../images/02.svg',
			text: 'Cafes & More'
		},
		{
			id: 9,
			img: '../images/03.svg',
			text: 'Drinks & Nightkise'
		},
		{
			id: 10,
			img: '../images/04.svg',
			text: 'Desserts & Bakes'
		},
		{
			id: 11,
			img: '../images/05.svg',
			text: 'Upcoming Events'
		},
		{
			id: 12,
			img: '../images/06.svg',
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
			img: '../images/meal-1.svg',
			text: 'Breakfast'
		},
		{
			id: 2,
			img: '../images/meal-2.svg',
			text: 'Lunch'
		},
		{
			id: 3,
			img: '../images/meal-3.svg',
			text: 'Dinner'
		},
		{
			id: 4,
			img: '../images/meal-4.svg',
			text: 'Cafe\'s'
		},
		{
			id: 5,
			img: '../images/meal-5.svg',
			text: 'Delivery'
		},
		{
			id: 6,
			img: '../images/meal-1.svg',
			text: 'Breakfast'
		},
		{
			id: 7,
			img: '../images/meal-2.svg',
			text: 'Lunch'
		},
		{
			id: 8,
			img: '../images/meal-3.svg',
			text: 'Dinner'
		},
		{
			id: 9,
			img: '../images/meal-4.svg',
			text: 'Cafe\''
		},
		{
			id: 10,
			img: '../images/meal-5.svg',
			text: 'Delivery'
		},
		]
	}
})
// brow places and quick food ends
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
					<a href="/restaurant-detail-view" class="btn my-btn" role="button" data-bs-toggle="button">View Menu</a>
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
			img: '../images/feature-1.jpg',
			name_food: 'Food Roster',
			name_restaurant: 'Indian Restaurant',
			location_time: 'New York City - 1569'
		},
		{
			id: 2,
			img: '../images/feature-2.jpg',
			name_food: 'Chef House',
			name_restaurant: 'American Restaurant',
			location_time: 'Chicago City - 1560'
		},
		{
			id: 3,
			img: '../images/feature-3.jpg',
			name_food: 'Rooster',
			name_restaurant: 'Indian Restaurant',
			location_time: 'Los Angeles City - 1561'
		},
		{
			id: 4,
			img: '../images/feature-4.jpg',
			name_food: 'Limon Resto',
			name_restaurant: 'Australian Restaurant',
			location_time: 'Luan Don City - 1562'
		},
		{
			id: 5,
			img: '../images/feature-5.jpg',
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
					<a href="/restaurant-detail-view" class="my-btn" role="button" data-bs-toggle="button">View <span>Menu</span></a>
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
			img: '../images/feature-6.jpg',
			name_food: 'Steak Resto'
		},
		{
			id: 2,
			img: '../images/feature-2.jpg',
			name_food: 'Meshi Restaurant'
		},
		{
			id: 3,
			img: '../images/feature-8.jpg',
			name_food: 'Momo Resto'
		},
		{
			id: 4,
			img: '../images/feature-1.jpg',
			name_food: 'Rooster'
		},
		{
			id: 5,
			img: '../images/feature-3.jpg',
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
			img: '../images/recipe_01.jpg',
			recipe: 'North Indian',
			video: '75'
		},
		{
			id: 2,
			img: '../images/recipe_02.jpg',
			recipe: 'Fast Food',
			video: '105'
		},
		{
			id: 3,
			img: '../images/recipe_03.jpg',
			recipe: 'Italian Food',
			video: '35'
		},
		{
			id: 4,
			img: '../images/recipe_04.jpg',
			recipe: 'Chinese Food',
			video: '60'
		},
		{
			id: 5,
			img: '../images/recipe_05.jpg',
			recipe: 'Street Food',
			video: '45'
		},
		{
			id: 6,
			img: '../images/recipe_06.jpg',
			recipe: 'Bakery',
			video: '20'
		},
		]
	}
})
// explore recipes ends