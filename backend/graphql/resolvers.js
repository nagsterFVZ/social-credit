const userController = require('../controllers/user.js');

const resolvers = {
	Query: {
		getUserById: async (_, input, context) => {
			
			const res = await userController.getUserById(input._id);
    
			return res;
		},
	},
	Mutation: {
		editUser: async (_, input, context) => {
            
			const res = await userController.editUser(input.input);

			return res;
		},
		registerUser:  async (_, input, context) => {
            
			const res = await userController.registerUser(input.input);

			return res;
		},
	}
};

module.exports = {
	resolvers
};
