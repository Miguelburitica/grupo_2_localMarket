module.exports = (sequelize, dataType) => {
	let cols = {
		id: {
			type: dataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: dataType.STRING,
			allowNull: false,
		},
		wayToSell: {
			type: dataType.TINYINT,
			allowNull: false,
		},
		kilo: {
			type: dataType.INTEGER,
			allowNull: false,
		},
		unit: {
			type: dataType.INTEGER,
			allowNull: false,
		},
		discount: {
			type: dataType.TINYINT,
			allowNull: false,
		},
		image: {
			type: dataType.STRING,
			allowNull: false,
		},
		users_id: {
			type: dataType.INTEGER,
			allowNull: false,
		},
		categories_id: {
			type: dataType.INTEGER,
			allowNull: false,
		},
		markets_id: {
			type: dataType.INTEGER,
			allowNull: false,
		},
	};

	let config = {
		tableName: 'products',
		timestamps: false,
	};

	const Product = sequelize.define('Product', cols, config);

	Product.associate = function (modelos) {
		Product.belongsTo(modelos.Market, {
			as: 'market',
			foreignKey: 'markets_id',
		}),
			Product.belongsTo(modelos.Category, {
				as: 'category',
				foreignKey: 'categories_id',
			});

		Product.belongsTo(modelos.User, {
			as: 'seller',
			foreingKey: 'users_id',
		});
	};

	return Product;
};
