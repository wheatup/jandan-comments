const mongoose = require('mongoose');

module.exports = function () {
	const db = config.get('db');
	mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
}