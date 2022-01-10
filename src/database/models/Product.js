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
		wayToSell: {
			type: dataType.TINYINT,
			notNull: true,
		},
		kilo: {
			type: dataType.INTEGER,
			notNull: false,
		},
		unit: {
			type: dataType.INTEGER,
			notNull: false,
		},
		discount: {
			type: dataType.TINYINT,
			notNull: false,
		},
		image: {
			type: dataType.STRING,
			notNull: true,
		},
		users_id: {
			type: dataType.INTEGER,
			notNull: true,
		},
		categories_id: {
			type: dataType.INTEGER,
			notNull: true,
		},
		markets_id: {
			type: dataType.TINYINT,
			notNull: true,
		},
	};

	let config = {
		tableName: 'products',
		timestamps: false,
	};

	const Product = sequelize.define('Product', cols, config);

	Product.associate = function (models) {
		Product.belongsTo(models.Category, {
			as: 'category',
			foreingKey: categories_id,
		}),
			Product.belongsTo(models.User, {
				as: 'seller',
				foreingKey: users_id,
			}),
			Product.belongsTo(models.Market, {
				as: 'market',
				foreingKey: markets_id,
			});
	};

	return Product;
};
