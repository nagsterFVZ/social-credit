// apollo.config.js
module.exports = {
	client: {
		service: {
			name: 'LTT-Memes',
			// URL to the GraphQL API
			url: 'http://localhost:4000/graphql',
		},
		// Files processed by the extension
		includes: ['src/**/*.vue', 'src/**/*.js'],
	},
};
