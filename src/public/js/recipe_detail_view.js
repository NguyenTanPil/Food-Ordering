// btn socilas
const share = document.querySelector('.share');
const btnShare = share.querySelector('.btn-share');
btnShare.onclick = (e) => {
	e.stopPropagation();
	share.classList.toggle('active');
}
// all tab
const navtabAll = document.querySelector('.all-tab');
const listNavLink = navtabAll.querySelectorAll('a');
const tabPane = document.querySelectorAll('.tab-pane');
removeDefault();
// nav tab
navtabAll.onclick = (e) => {
	removeAllTab();
	removeAllTabPane();
	addActive(e);
}
// remove default a link
function removeDefault() {
	listNavLink.forEach(link => {
		link.onclick = (e) => e.preventDefault();
	});
}
// remove bnt tab
function removeAllTab() {
	listNavLink.forEach(nav => { 
		nav.parentElement.classList.remove('active');
	});
}
// remove all tabpane
function removeAllTabPane() {
	tabPane.forEach(tab => {
		tab.classList.remove('active');
	});
}
// add active
function addActive(e) {
	const currentTab = e.target.parentElement;
	const showTab = document.getElementById(currentTab.dataset.id);
	showTab.classList.add('active');
	currentTab.classList.add('active');
}
// set width caption 
function setSizeCaption() {
	const reCmtItem = document.querySelector('.recommended-meal-item');
	const reCmtItemWidth = reCmtItem.offsetWidth;
	const captionEl = document.querySelectorAll('.caption');
	captionEl.forEach((cap) => {
		cap.style.width = `${reCmtItemWidth - 120}px`;
	});
}
// resize
window.addEventListener('resize', () => {
	changePositon();
	positionTopbar();
	setSizeCaption();
});
// onload
window.onload = () => {
	document.querySelector('.loading').style.display = 'none';
	setSizeCaption();
}
// count star
function countStar(parent, numberStar) {
	const stars = parent.querySelectorAll('.rating i');
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
// your rating
const slRating = document.querySelector('.select-rating .rating');
const starSelect = slRating.querySelectorAll('i');
slRating.onclick = (e) => {
	const numberStar = e.target.dataset.id;
	yourRating(numberStar);
}
function yourRating(numberStar) {
	starSelect.forEach((star, index) => {
		if(index < numberStar) {
			star.style.color = 'orange';
		} else {
			star.style.color = 'rgb(0 0 0 / 55%)';
		}
	}); 
}

// fetch api 
const currLink = window.location.href;
const recipeUrl = `/user/api//videos-view/${currLink.slice(currLink.lastIndexOf('/') + 1)}`;
const mealsUrl =  `/user/api/meals-view`;
let userUrl;

start();

function start() {
	getRecipe(recipeUrl, renderRecipe);
	getMeals(mealsUrl, renderMeals);
}

// user
function getUser(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err))
}

function renderUser(user) {
	const avartar = document.querySelector('.user-details .user-img img');
	const name = document.querySelector('.user-details .name-location h4');
	const location = document.querySelector('.user-details .name-location .location');

	avartar.src =  user.avartar;
	name.innerText = user.name;
	location.innerText = user.location;
}

// video
function getRecipe(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderRecipe(recipe) {
	userUrl =  `/user/api/user-detail/${recipe.userId}`;
	const video = document.querySelector('.video iframe');
	const title = document.querySelector('.title-share h4');
	const about = document.querySelector('.about-recipe p');

	const link = recipe.link.slice(recipe.link.lastIndexOf('/') + 1);
	video.src = `https://www.youtube.com/embed/${link}`;
	title.innerText =  recipe.title;
	about.innerText = recipe.description;
	getUser(userUrl, renderUser);
}

// meals recommend
function getMeals(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderMeals(meals) {
	const recommendMeals = document.querySelector('.recommended-meal');
	const container = [];
	meals.forEach(meal => {
		container.push(componentMeal(meal));
	});
	recommendMeals.innerHTML =  container.join('');
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function componentMeal(meal) {
	const date = new Date(meal.createdAt);
	return `
		<div class="recommended-meal-item">
			<img src="${meal.photos[0]}" alt="meal item">
			<div class="caption">
				<a href="/recipe/recipe-details">
					<h4>
						${meal.name}
					</h4>
				</a>
				<p><span class="published-span">Published</span> ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</p>
				<div class="rating">
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star-o" aria-hidden="true"></i>
					<span>4.0</span>
				</div>
			</div>
		</div>
	`;
}

//comments
const listCmts = [
	{
		id: 1,
		img: '1',
		name: 'Jassica William',
		time: '12',
		content: 'Morbi hendrerit ipsum vel feugiat maximus. Duis posuere justo neque, sit amet efficitur quam aliquam non. Integer gravida ex quis lacinia consectetur.'
	},
	{
		id: 2,
		img: '2',
		name: 'Jass Singh',
		time: '13',
		content: 'Morbi hendrerit ipsum vel feugiat maximus. Duis posuere justo neque, sit amet efficitur quam aliquam non. Integer gravida ex quis lacinia consectetur.'
	},
	{
		id: 3,
		img: '3',
		name: 'Johnson Smith',
		time: '14',
		content: 'Morbi hendrerit ipsum vel feugiat maximus. Duis posuere justo neque, sit amet efficitur quam aliquam non. Integer gravida ex quis lacinia consectetur.'
	},
	{
		id: 4,
		img: '4',
		name: 'Joy Cutler',
		time: '15',
		content: 'Morbi hendrerit ipsum vel feugiat maximus. Duis posuere justo neque, sit amet efficitur quam aliquam non. Integer gravida ex quis lacinia consectetur.'
	}
];
const comments = document.querySelector('#comments');
listCmts.forEach((cmt) => {
	const div = document.createElement('div');
	div.className = 'main-comments';
	div.innerHTML = `
		<div class="comment">
			<div class="user-comment">
				<a href="/user-profile-view">
					<img src="/images/user-${cmt.img}.png" alt="user comment">
				</a>
				<a href="/user-profile-view">
					<h4 class="name">${cmt.name}</h4>
				</a>
			</div>
			<div class="reply-time">
				<a href="#">Reply</a>
				<p>
					<i class="fa fa-clock-o" aria-hidden="true"></i>
					${cmt.time} hours ago
				</p>
			</div>
			<div class="desciption-comment">
				<p>${cmt.content}</p>
			</div>
		</div>
	`;
	comments.appendChild(div); 
});
// reviews 
const listReviews = [
	{
		id: 1,
		img: '5',
		name: 'Joy Cutler',
		time: '12',
		stars: '4.5',
		content: 'Morbi hendrerit ipsum vel feugiat maximus. Duis posuere justo neque, sit amet efficitur quam aliquam non. Integer gravida ex quis lacinia consectetur.'
	},
	{
		id: 2,
		img: '4',
		name: 'Jass Singh',
		time: '12',
		stars: '4.0',
		content: 'Morbi hendrerit ipsum vel feugiat maximus. Duis posuere justo neque, sit amet efficitur quam aliquam non. Integer gravida ex quis lacinia consectetur.'
	}
];
const reviews = document.querySelector('#reviews');
listReviews.forEach(review => {
	const div = document.createElement('div');
	div.className = 'main-comments';
	div.innerHTML = `
		<div class="comment">
			<div class="user-comment">
				<a href="/user-profile-view">
					<img src="/images/user-${review.img}.png" alt="user comment">
				<div class="name-rating">
					<a href="/user-profile-view">
					<h4 class="name">${review.name}</h4>
				</a>
				<div class="rating">
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star-o" aria-hidden="true"></i>
					<span>${review.stars}</span>
				</div>
				</div>	
										</div>
			<div class="reply-time">
				<p>
					<i class="fa fa-clock-o" aria-hidden="true"></i>
					${review.time} hours ago
				</p>
			</div>
			<div class="desciption-comment">
				<p>${review.content}</p>
			</div>
		</div>
	`;
	countStar(div, review.stars);
	reviews.appendChild(div);
});
// see more and see less
const see = document.querySelector('.see');
const seeMore = document.querySelector('.more');
const seeLess = document.querySelector('.dots');
see.onclick = () => {
	if(see.innerText == 'See more') {
		seeMore.style.display = 'inline';
		seeLess.style.display = 'none';
		see.innerText = 'See less';
	} else {
		seeMore.style.display = 'none';
		seeLess.style.display = 'inline';
		see.innerText = 'See more';
	}
};
