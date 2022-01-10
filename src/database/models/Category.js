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
	};

	let config = {
		tableName: 'categories',
		timestamps: false,
	};

	const Category = sequelize.define('Category', cols, config);

	Category.associate = function (models) {
		Category.hasMany(models.Product, {
			as: 'products',
			foreignKey: 'categories_id',
		});
	};

	return Category;
};
