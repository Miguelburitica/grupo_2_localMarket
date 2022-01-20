const path = require('path');
const db = require(path.resolve(__dirname, '../database/models'));
const { Op } = require('sequelize');

class Market {
	constructor(name, direction) {
		this.name = name;
		this.direction = direction;
	}
}

const model = {
	getAll: async function () {
		try {
			let markets = await db.Market.findAll();
			return markets;
		} catch (err) {
			return err;
		}
	},
	getSome: async function (callBack) {
		try {
			let markets = await db.Market.findAll({ include: ['products'] });
			let allMarkets = markets.filter(callBack);
			return allMarkets;
		} catch (err) {
			return err;
		}
	},

	getByPk: async function (pk) {
		try {
			let market = await db.Market.findByPk(pk, { include: ['products'] });
			return market;
		} catch (err) {
			console.log(err);
		}
	},
	createOne: async function (market) {
		try {
			let newMarket = new Market(market.name, market.direction);
			await db.Market.create(newMarket);
		} catch (err) {
			console.log(err);
		}
	},
	updateOne: async function (market) {
		try {
			let newMarket = new Market(market.name, market.direction);
			await db.Market.update(newMarket, {
				where: { id: market.id },
			});
		} catch (err) {
			console.log(err);
		}
	},
	deleteOne: async function (pk) {
		try {
			if (pk !== undefined && pk !== null) {
				return await db.Market.destroy({ where: { id: pk } });
			} else {
				let err = new Error('Falta un where en el delete prro >:s');
				console.log(err);
			}
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = model;
