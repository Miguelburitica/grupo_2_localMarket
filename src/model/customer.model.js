let env = process.env
env.USER ='root' 
env.DATABASE_PASSWORD = '1234'
env.DATABASE_NAME = 'LocalMarket'
env.DATABASE_HOST = '127.0.0.1'
env.DATABASE_PORT = '3307'

const path = require('path');
// const fs = require('fs');
// const dataCustomers = require('../data/customers.json');
// path Customer JSON

const db=require(path.resolve(__dirname,'../database/models'));

// class User {
//     constructor(id,user_name,name, surname,email,phone,password,photo){
//         this.id=id;
//         this.user_name=user_name;
//         this.name=name;
//         this.surname=surname;
//         this.email=email;
//         this.phone=phone;
//         this.password=password;
//         this.photo=photo;
//         this.rols_id=2;
//     }
// }
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

    createCustomer: async function(user){
       try{
        let newuser={
            id:user.id,
            names:user.names,
            surname:null,
            email:user.email,
            phone:user.phone,
            password:user.password,
            photo:user.photo,
            rols_id:2,
            }
            await db.User.create(newuser)
       } catch(err){
        console.log(err)
        return err;
       } 
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

let a={
    names:'maryo sasas',
    surname:'sosa',
    email:'dmnn@gmail.com',
    phone:'005679494',
    password:'12345676',
    photo:'user.photo', 
}
async function Mostrar(){
  let x= await model.createCustomer(a)
  console.log(x)
}

Mostrar()