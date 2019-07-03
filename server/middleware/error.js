module.exports = function (err, req, res, next) {
	console.error(err.message, err);
	res.status(500).send('Something failed.');
}