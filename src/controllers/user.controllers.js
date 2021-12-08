const path = require('path');
const dataSellers = require('../data/sellers.json');
const fs = require('fs');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/users/' + nameView + '.ejs');
};

function getSellers() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/sellers.json'), 'utf-8'));
}

function getCustomers() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/customers.json'), 'utf-8'));
}

function updateCustomers(customers) {
	fs.writeFileSync(path.resolve(__dirname, '../data/customers.json'), JSON.stringify(customers, null, 4));
}

function updateSellers(sellers) {
	fs.writeFileSync(path.resolve(__dirname, '../data/sellers.json'), JSON.stringify(sellers, null, 4));
}

function newSellerId() {
	let ultimo = 0;
	getSellers().forEach((seller) => {
		if (seller.id > ultimo) {
			ultimo = seller.id;
		}
	});
	return ultimo + 1;
}

function newCustomerId() {
	let ultimo = 0;
	getCustomers().forEach((seller) => {
		if (seller.id > ultimo) {
			ultimo = seller.id;
		}
	});
	return ultimo + 1;
}

const controller = {
	getSellers: function () {
		return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/sellers.json'), 'utf-8'));
	},

	getCustomers: function () {
		return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/customers.json'), 'utf-8'));
	},

	updateCustomers: function (customers) {
		fs.writeFileSync(path.resolve(__dirname, '../data/customers.json'), JSON.stringify(customers, null, 4));
	},

	updateSellers: function (sellers) {
		fs.writeFileSync(path.resolve(__dirname, '../data/sellers.json'), JSON.stringify(sellers, null, 4));
	},

	showSellerProfile: function (req, res) {
		const seller = dataSellers[0];
		res.render(pathViews('seller'), { seller: seller });
	},

	showLogin: function (req, res) {
		res.render(pathViews('login'));
	},

	showSignInSeller: function (req, res) {
		res.render(pathViews('sign-in-seller'));
	},

	showSignInConsumer: function (req, res) {
		res.render(pathViews('sign-in-consumer'));
	},

	addUser: function (req, res) {
		const user = { ...req.body };
		let users = [];
		console.log(user);
		if (user.market === undefined) {
			user.id = newCustomerId();
			users = getCustomers();
			users.push(user);
			updateCustomers(users);
		} else {
			user.id = newSellerId();
			users = getSellers();
			users.push(user);
			updateSellers(users);
		}
		console.log(user);
		console.log(users);
		res.redirect('/');
	},
};

module.exports = controller;
