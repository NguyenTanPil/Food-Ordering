//-----------------------------------------------------------------------------------------
// brow places and quick food starts
Vue.component('items', {
	props: ['obj'],
	template: `
		<div class="places">
			<a href="/views/all-meals">
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