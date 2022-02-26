const env = process.env;

module.exports = {
	development: {
		username: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_NAME,
		host: env.DATABASE_HOST,
		dialect: 'mysql',
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
