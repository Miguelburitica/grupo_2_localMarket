const path = require('path');
// const fs = require('fs');
// const dataCustomers = require('../data/customers.json');
// path Customer JSON

const db=require(path.resolve(__dirname,'../database/models'));

class User {
    constructor(id,user_name,name, surname,email,phone,password,photo){
        this.id=id;
        this.user_name=user_name;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.phone=phone;
        this.password=password;
        this.photo=photo;
        this.rols_id=2;
    }
}
const model ={
    
    getCustomers: async function() {
        // return JSON.parse(fs.readFileSync(customerFilePath, 'utf-8'));
       try{
           let customers = await db.User.findAll({
        include:['rol'],
        where:{
            rols_id:2,
        }
    });
    return customers;
} catch (err){
        console.log(err)
        return err;
    }
    },

    findByEmailCustomer: async function(email) {
       try{
           const allCustomers = await this.getCustomers();
        const foundCustomer = await allCustomers.find((item) => 
        item.email === email);
        return foundCustomer;
    } catch (err){
        console.log(err)
        return err;
    }
    },
    //falta
    updateCustomers: function(customers) {
        fs.writeFileSync(customerFilePath, JSON.stringify(customers, null, 4));
    },

    createCustomer: async function(req){

    },

    newCustomerId: async function() {
        let ultimo = 0;
        let customers= await this.getCustomers()
        customers.forEach((seller) => {
            if (seller.id > ultimo) {
                ultimo = seller.id;
            }
        });
        return ultimo + 1;
    }
}

// module.exports = model;


async function Mostrar(){
  let x= await model.getCustomers()
  console.log(x)
}

Mostrar()