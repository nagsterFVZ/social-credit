require('dotenv').config();
const { User } = require('../database/models/user.js');

const editUser = async (userDataToUpdate) => {
	console.log(userDataToUpdate);
	const user = await User.findById(userDataToUpdate._id);
    
	if (!user) throw new Error('User does not exist');

	let userDataToUpdateWithoutNulls = Object.fromEntries(Object.entries(userDataToUpdate).filter(([_, v]) => v != null));

	userDataToUpdateWithoutNulls.updatedAt = new Date();

	User.updateOne({_id: userDataToUpdate._id}, userDataToUpdateWithoutNulls, (err) => {
		if (err) {
			console.error.log(err);
			return { status: false };
		}        
	});   
    
	return { status: true };
};

const getUserById = async (id) => {
	const user = await User.findOne({ socialId: id });
    
	if (!user) return null;

	return user;
};

const registerUser = async (user) => {
	const newUser = new User(user);

	newUser.save((err) => {
		console.log(err);
		if (err) return err;        
	});

	const res = {
		user: newUser
	};

	return res;
};

module.exports = {    
	editUser,
	getUserById,
	registerUser
};
