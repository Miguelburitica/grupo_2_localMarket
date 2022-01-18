const path = require('path');
const fs = require('fs');
const dataCustomers = require('../data/customers.json');
//cambiar la bd
// const db=require('../database/models')
// path Customer JSON
const customerFilePath = path.resolve(__dirname, '../data/customers.json');

const model ={
    
    getCustomers: function() {
        return JSON.parse(fs.readFileSync(customerFilePath, 'utf-8'));
    },

    findByEmailCustomer: function(email) {
        const allCustomers = this.getCustomers();
        const foundCustomer = allCustomers.find((item) => item.email === email);
        return foundCustomer;
    },
    
    updateCustomers: function(customers) {
        fs.writeFileSync(customerFilePath, JSON.stringify(customers, null, 4));
    },
    newCustomerId: function() {
        let ultimo = 0;
        this.getCustomers().forEach((seller) => {
            if (seller.id > ultimo) {
                ultimo = seller.id;
            }
        });
        return ultimo + 1;
    }
}

module.exports = model;