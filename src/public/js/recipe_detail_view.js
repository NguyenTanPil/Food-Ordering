let starsAvg = 0;
// btn socilas
const share = document.querySelector('.share');
const btnShare = share.querySelector('.btn-share');
btnShare.onclick = (e) => {
	e.stopPropagation();
	share.classList.toggle('active');
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
	const stars = parent.querySelector('.rating');
	let n = parseFloat(numberStar);
	let star;
	const container = [];
	for(let index = 1; index <= 5; index++) {
		if(index <= n) {
			star = 'fa-star';
		} else if(index > n && index < n) {
			star = 'fa-star-half-o';
		} else {
			star = 'fa-star-o';
		}
		container.push(`<i class="fa ${star}" aria-hidden="true"></i>`);
	}
	container.push(`<span>${n}.0</span>`);
	stars.innerHTML = container.join('');
}
// your rating
const slRating = document.querySelector('.select-rating .rating');
const starSelect = slRating.querySelectorAll('i');
slRating.onclick = (e) => {
	const numberStar = e.target.dataset.id;
	stars = numberStar;
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
const commentUrl = `/user/api/recipes/${currLink.slice(currLink.lastIndexOf('/') + 1)}/comments`;
const mealsUrl =  `/user/api/meals-view`;
let userUrl;

start();

function start() {
	getRecipe(recipeUrl, renderRecipe);
	getMeals(mealsUrl, renderMeals);
	getCommentsMeal(commentUrl, renderCommentsMeal);
}

// update stars
function updateStars(url, starsAvg) {
	fetch(url, {
		method: 'PATCH',
		headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({stars: starsAvg}),
	});
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
	const starsRecipe = document.querySelector('.my-rating span');

	const link = recipe.link.slice(recipe.link.lastIndexOf('/') + 1);
	video.src = `https://www.youtube.com/embed/${link}`;
	starsRecipe.innerText = `${recipe.stars}.0`;
	title.innerText =  recipe.title;
	about.innerText = recipe.description;
	countStar(starsRecipe.parentElement.parentElement, recipe.stars);
	getUser(userUrl, renderUser);
}

// comments 
function getCommentsMeal(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(callback)
		.catch(err => console.log(err));
}

function renderCommentsMeal(comments) {
	const mainComments = document.querySelector('.main-comments');
	mainComments.innerHTML = '';
	comments.forEach(comment => {
		starsAvg += comment.stars;
		mainComments.appendChild(componentCommentMeal(comment));
	});
	starsAvg = Math.floor(starsAvg / comments.length);
}
function componentCommentMeal(comment) {
	const dateNow = Date.now();
	const dateCmt = new Date(comment.createdAt).getTime();
	const hours = Math.floor(((dateNow - dateCmt) / (1000 * 60 * 60)) % 24);
	const div = document.createElement('div');
	div.className = 'comment';
	div.innerHTML =  `
			<div class="user-comment">
				<a href="/user-profile-view">
					<img src="${comment.avartar}" alt="user comment">
				<div class="name-rating">
					<a href="/user-profile-view">
					<h4 class="name">${comment.userName}</h4>
				</a>
				<div class="rating">
				</div>
				</div>	
			</div>
			<div class="reply-time">
				<p>
					<i class="fa fa-clock-o" aria-hidden="true"></i>
					${hours} hours ago
				</p>
			</div>
			<div class="desciption-comment">
				<p>${comment.content}</p>
			</div>
	`;
	countStar(div, comment.stars);
	return div;
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

// comment
const formComment = document.querySelector('.comment-post form');
const inputComment = formComment.querySelector('input');
formComment.addEventListener('submit', (e) => {
	e.preventDefault();
	const url = `/user/api/recipes/${currLink.slice(currLink.lastIndexOf('/') + 1)}`;
	const data = {
		content: inputComment.value,
		mealSlug: currLink.slice(currLink.lastIndexOf('/') + 1),
		stars: stars,
	}
	if(document.cookie == '') {
		window.location.replace('/user/login');
		return;
	}
	if(inputComment.value == '') {
		return;
	}
	fetch(url, {
		method: 'POST',
		headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
	})
	inputComment.value = '';
	getCommentsMeal(commentUrl, renderCommentsMeal);
	updateStars(recipeUrl, starsAvg);
	const starsRecipe = document.querySelector('.my-rating span');
	starsRecipe.innerText = `${starsAvg}.0`;
	countStar(starsRecipe.parentElement.parentElement, starsAvg);
});


