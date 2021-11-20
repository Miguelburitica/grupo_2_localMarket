const path = require('path');
const fs = require('fs');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../../views/products/' + nameView + '.ejs');
};

const data = require('../../data/products.json');
const productsFilePath = path.resolve(__dirname, '../../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


//función que permite almacenar el producto nuevo con el id superior al mayor de data
const newId=() =>{
	let ultimo=0;
	products.forEach(product => {
		if(product.id>ultimo){
			ultimo = product.id;
		}
	});
	return ultimo+1;
}

const controller = {
	// Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.
	showCreateEdit: function (req, res) {
		res.render(pathViews('create-edit'));
	},

	showEditItem: function (req, res) {
		res.render(pathViews('edit-item'));
	},

	showAddItem: function (req, res) {
		res.render(pathViews('add-item'));
	},

	storeAddItem:function (req, res) {
		
		const product={
			id: newId(),
			name: req.body.name,
			price: req.body.price,
			discount:req.body.discount,
			category: req.body.categoria,
			image: req.file.filename,
		}
	
		console.log(req.file)
		products.push(product);
		const jsonProducts=JSON.stringify(products, null,4);
		fs.writeFileSync(productsFilePath, jsonProducts);

		res.redirect(pathViews('/create-edit'));
	},

	showDetail: function (req, res) {
		const id = req.params.id;
		const suggestProducts = data.filter(
			(item) => item.id > 1 && item.id < 6
		);
		const product = data.find((item) => item.id == id);
		res.render(pathViews('detail'), {
			product: product,
			suggest: suggestProducts,
		});
	},

	showShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
