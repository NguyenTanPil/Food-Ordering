// about item starts
const listAbout = [
	{
		id: 1,
		img: '1',
		title: 'Search',
		text: 'Nunc et risus. Etiam a nibh tunil Phasellus dignissim metus.'
	},
	{
		id: 2,
		img: '2',
		title: 'Choose',
		text: 'Nunc et risus. Etiam a nibh tunil Phasellus dignissim metus.'
	},
	{
		id: 3,
		img: '3',
		title: 'Pay',
		text: 'Nunc et risus. Etiam a nibh tunil Phasellus dignissim metus.'
	},
	{
		id: 4,
		img: '4',
		title: 'Enjoy',
		text: 'Nunc et risus. Etiam a nibh tunil Phasellus dignissim metus.'
	}
];
const containerAboutItem = document.querySelector('.container-about-item');
listAbout.forEach((item) => {
	const div = document.createElement('div');
	div.className = 'col col-12 col-sm-6 col-lg-3';
	div.innerHTML = `
		<div class="about-item">
			<img src="assets/images/about-${item.img}.svg" alt="">
			<h4>${item.title}</h4>
			<p>${item.text}</p>
		</div>
	`;
	containerAboutItem.appendChild(div);
});
// about item ends
// team starts
const listTeam = [
	{
		id: 1,
		img: '1',
		name: 'John Doe',
		position: 'Co-Founder'
	},
	{
		id: 2,
		img: '2',
		name: ' Rock Smith ',
		position: ' Founder '
	},
	{
		id: 3,
		img: '3',
		name: ' Jassica William ',
		position: ' Manager '
	},
	{
		id: 4,
		img: '4',
		name: ' Johnson ',
		position: ' Marketing Manager '
	}
];
const teams = document.querySelector('.list-team');
listTeam.forEach((teamItem) => {
	const div = document.createElement('div');
	div.className = 'col col-12 col-sm-6 col-lg-3';
	div.innerHTML = `
		<div class="team-item">
			<div class="team-img">
				<img src="assets/images/team-${teamItem.img}.jpg" alt="team 1">
			</div>
			<h4>${teamItem.name}</h4>
			<p>${teamItem.position}</p>
			<div class="social-btns">
				<a href="#">
					<div class="social-btn btn-1">
						<i class="fa fa-facebook" aria-hidden="true"></i>
					</div>
				</a>
				<a href="#">
					<div class="social-btn btn-2">
						<i class="fa fa-twitter" aria-hidden="true"></i>
					</div>
				</a>
				<a href="#">
					<div class="social-btn btn-3">
						<i class="fa fa-instagram" aria-hidden="true"></i>
					</div>
				</a>
				<a href="#">
					<div class="social-btn btn-4">
						<i class="fa fa-linkedin" aria-hidden="true"></i>
					</div>
				</a>
				<a href="#">
					<div class="social-btn btn-5">
						<i class="fa fa-youtube-play" aria-hidden="true"></i>
					</div>
				</a>
			</div>
		</div>
	`;
	teams.appendChild(div);
});
// team ends