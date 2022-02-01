const path = require('path');
const db = require(path.resolve(__dirname, '../database/models'));

class Category {
	constructor(name, direction) {
		this.name = name;
		this.direction = direction;
	}
}

const model = {
	getAll: async function () {
		try {
			let categorys = await db.Category.findAll();
			return categorys;
		} catch (err) {
			console.log(err);
		}
	},
	getSome: async function (callBack) {
		try {
			let categorys = await db.Category.findAll({ include: ['products'] });
			let allcategorys = categorys.filter(callBack);
			return allcategorys;
		} catch (err) {
			console.log(err);
		}
	},

	getByPk: async function (pk) {
		try {
			let category = await db.Category.findByPk(pk, { include: ['products'] });
			return category;
		} catch (err) {
			console.log(err);
		}
	},
	createOne: async function (category) {
		try {
			let newCategory = new Category(category.name, category.direction);
			await db.category.create(newCategory);
		} catch (err) {
			console.log(err);
		}
	},
	updateOne: async function (category) {
		try {
			let newCategory = new Category(category.name, category.direction);
			await db.category.update(newCategory, {
				where: { id: category.id },
			});
		} catch (err) {
			console.log(err);
		}
	},
	deleteOne: async function (pk) {
		try {
			if (pk !== undefined && pk !== null) {
				return await db.category.destroy({ where: { id: pk } });
			} else {
				throw new Error('Falta un where en el delete prro >:s');
			}
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = model;
