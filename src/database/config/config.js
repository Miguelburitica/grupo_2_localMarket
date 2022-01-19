const env = process.env;

module.exports = {
	development: {
		username: env.USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME,
		host: env.DATABASE_HOST,
		dialect: 'mysql',
		port: env.DATABASE_PORT,
	},
	test: {
		username: env.USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME,
		host: env.DATABASE_HOST,
		dialect: 'mysql',
	},
	production: {
		username: env.USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME,
		host: env.DATABASE_HOST,
		dialect: 'mysql',
	},
};
