//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	score: Number,
	socialId: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = {
	User
};