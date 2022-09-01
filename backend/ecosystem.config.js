module.exports = {
	apps : [
		{
			name: 'ltt-api',
			script: './index.js',
			instances : 'max',
			exec_mode : 'cluster',
		}
	]
};