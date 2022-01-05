const path = require('path');
const fs = require('fs');
const dataSellers = require('../data/sellers.json');
// path Seller JSON
const sellerFilePath = path.resolve(__dirname, '../data/sellers.json');

const model = {
    // Obtener todos los sellers
    getSellers: function() {
        return JSON.parse(fs.readFileSync(sellerFilePath), 'utf-8');
    },
    // Encontrar un seller por email
    findByEmailSeller:function(email){
        const allSellers = this.getSellers();
        const foundSeller = allSellers.find((item) => item.email === email);
        return foundSeller;
    },
    // Actualizar el JSON de sellers
    updateSellers: function(sellers){
        fs.writeFileSync(sellerFilePath, JSON.stringify(sellers, null, 4));
    },
    //Obtener el nuevo ID seller
    newSellerId: function(){
        let ultimo = 0;
        this.getSellers().forEach((seller) => {
            if (seller.id > ultimo){
                ultimo = seller.id;
            }
        });
        return ultimo + 1;
    }
}

module.exports = model;
