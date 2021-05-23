// nhung meals hang cua user
const Videos = require('../../app/models/Video.js');
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose.js');

class VideosController {
	// [GET] /user/api/videos
	async fetchVideos(req, res) {
		const userId = req.cookies.userId;
		const videos = getVideos(userId);
		const videosUser = await videos;
		res.json(videosUser);
	}
	// [GET] /user/api/videos/:slug
	async fetchVideoDetail(req, res) {
		const userId = req.cookies.userId;
		const video = getVideoDetail(userId, req.params.slug);
		const videoUser = await video;
		res.json(videoUser);
	}
}

// function
// get video detail
async function getVideoDetail(userId, slug) {
	let video;
	await Videos.findOne({ userId: userId, slug: slug })
		.then((data) => {
			video = mongooseToOject(data);
		});
	return video;
}

// get videos
async function getVideos(userId) {
	let videos;
	await Videos.find({ userId: userId })
		.then((data) => {
			videos = mutipleMongooseToOject(data);
		});
	return videos;
}

module.exports = new VideosController;
