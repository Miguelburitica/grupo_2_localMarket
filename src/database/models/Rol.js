module.exports = (sequelize, dataType) => {
	let cols = {
		id: {
			type: dataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		rol: {
			type: dataType.STRING,
			notNull: true,
		},
	};

	let config = {
		tableName: 'rols',
		timestamps: false,
	};

	const Rol = sequelize.define('Rol', cols, config);

	Rol.associate = function (models) {
		Rol.hasMany(models.User, {
			as: 'users',
			foreignKey: 'rols_id',
		});
	};

	return Rol;
};
