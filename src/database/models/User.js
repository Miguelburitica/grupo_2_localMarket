module.exports = (sequelize, dataType) => {
	let cols = {
		id: {
			type: dataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_name: {
			type: dataType.STRING,
		},
		names: {
			type: dataType.STRING,
			allowNull: false,
		},
		surname: {
			type: dataType.STRING,
			allowNull: false,
		},
		email: {
			type: dataType.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: dataType.INTEGER,
			allowNull: false,
		},
		password: {
			type: dataType.STRING,
			allowNull: false,
		},
		photo: {
			type: dataType.STRING,
			allowNull: false,
		},
		agree_terms: {
			type: dataType.STRING,
		},
		agree_data: {
			type: dataType.STRING,
		},
		rols_id: {
			type: dataType.INTEGER,
			allowNull: false,
		},
	};

	let config = {
		tableName: 'users',
		timestamps: false,
	};

	const User = sequelize.define('User', cols, config);

	User.associate = function (modelos) {
		User.belongsToMany(modelos.Market, {
			as: 'markets',
			through: 'markets_has_users',
			foreignKey: 'users_id',
			otherKey: 'markets_id',
		});

        User.hasMany(modelos.Product,{
            as: 'products',
            foreignKey: 'users_id',
        });
        
        User.belongsTo(modelos.Rol, {
                as: 'rol',
                foreignKey: 'rols_id',
            });
	};
	return User;
};
