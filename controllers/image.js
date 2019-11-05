const Clarifai = require  ('clarifai');

const app = new Clarifai.App({
 apiKey: 'f2abcccc9c8e42d19f88b0e97aeb3905'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with Api'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	console.log(entries[0])
  	res.json(entries[0])
  })
  .catch(err => {
  	res.status(400).json('Unable to get entries')
  })
}

module.exports = {
	handleImage,
	handleApiCall
}