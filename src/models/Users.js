const fs = require('fs');
const path = require('path')
const customersFilePath = path.resolve(__dirname, '../data/customers.json');
const User = {

    getData: function(){
        return JSON.parse(fs.readFileSync(customersFilePath,'utf-8'));
    },
    
    findAll: function(){
        return this.getData();
    },

    findById: function(id){
        const allUsers = this.findAll();
        const foundUser = allUsers.find(item => item.id === id);
        return foundUser;
    },

    findByEmail: function(email){
        const allUsers = this.findAll();
        const foundUser = allUsers.find(item => item.email === email);
        return foundUser;
    }

}
console.log(User.findByEmail("swakefield4@google.nl"));