const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar JSON

	type User {
		_id: String!
		name: String!
		score: Int!
		socialId: String!
	}

	type EditUserResponse {
		status: Boolean!
		error: Error
	}

	type RegisterResponse {
		error: Error
		user: User
	}

	# Errors follow a code standard
	# Email not found = 0
	# Email already taken = 1
	# Authentication failed = 2
	# Username not available = 3
	# Can't update email to what it already is = 4
	type Error {
		message: String!
		type: Int!
	}

	input EditUserInput {
		_id: String!
		name: String
		score: Int
		socialId: String
	}

	input RegisterInput {
		name: String!
		score: Int!
		socialId: String!
	}

	type Query {
		getUserById(_id: String): User
	}

	type Mutation {
		registerUser(input: RegisterInput!): RegisterResponse!
		editUser(input: EditUserInput!): EditUserResponse!
	}
`;

module.exports = {
	typeDefs,
};
