module.exports = (sequelize, dataType) => {
	let cols = {
		id: {
			type: dataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: dataType.STRING,
			notNull: true,
		},
		direction: {
			type: dataType.STRING,
			notNull: true,
		},
	};

	let config = {
		tableName: 'markets',
		timestamps: false,
	};

	const Market = sequelize.define('Market', cols, config);

	Market.associate = function (models) {
		Market.hasMany(models.Product, {
			as: 'products',
			foreignKey: 'markets_id',
		}),
			Market.belongsToMany(models.User, {
				as: 'users',
				through: 'markets_has_users',
				foreignKey: 'markets_id',
				otherKey: 'users_id',
			});
	};

	return Market;
};
