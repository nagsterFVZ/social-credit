require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

const { typeDefs } = require('./graphql/typeDefs.js');
const { resolvers } = require('./graphql/resolvers.js');

const env = process.env.pm2_env;

// Set up DB connection
const db_host = process.env[`db_host_${env}`];
const db_username = process.env[`db_username_${env}`];
const db_password = process.env[`db_password_${env}`];

const creds =
  'mongodb+srv://' +
  db_username +
  ':' +
  db_password +
  '@' +
  db_host +
  '/' +
  '?retryWrites=true&w=majority';

mongoose.connect(creds, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));

// Set up Graphql Server
const initializeServer = async () => {
	const gqlPort = process.env.gql_port;
	const app = express();    
    
	const server = new ApolloServer({ 
		typeDefs,
		resolvers,
		context: ({ req }) => ({
			headers: req.headers
		})
	});
    
	app.use(cors());

	await server.start();

	server.applyMiddleware({ app });
    
	app.listen({ port: gqlPort }, () => {
		if (env === 'dev') {
			console.log(`🚀 Server ready at http://localhost:${gqlPort}${server.graphqlPath}`);
			console.log('🟢 Running in dev mode with no clustering');
		} else {
			if (cluster.worker.id === 1) {
				console.log(`🚀 Server ready at http://localhost:${gqlPort}${server.graphqlPath}`);
				console.log(`🟢 Running in ${env} mode with ${totalCPUs} nodes running in this cluster`);
			}
		}		
	});
};

module.exports = {
	initializeServer,
};
