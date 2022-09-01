require('dotenv').config();
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

const { initializeServer } = require('./server.js');
if (process.env.pm2_env === 'dev') {
	initializeServer();
} else {
	if (cluster.isMaster) {   
		// Fork worker nodes
		for (let i = 0; i < totalCPUs; i++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, _, __) => {
			console.log(`🔴 worker ${worker.process.pid} died`);
			console.log('🟢 new worker created');
			cluster.fork();
		});
	} else {
		initializeServer();
	}
}
