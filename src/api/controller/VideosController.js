// nhung meals hang cua user
const Videos = require('../../app/models/Video.js');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class VideosController {
	// [GET] /user/api/videos
	async fetchVideos(req, res) {
		const userId = req.cookies.userId;
		const videos = getVideos(userId);
		const videosUser = await videos;
		res.json(videosUser);
	}
}

// function
async function getVideos(userId) {
	let videos;
	await Videos.find({ userId: userId })
		.then((data) => {
			videos = mutipleMongooseToOject(data);
		});
	return videos;
}

module.exports = new VideosController;
