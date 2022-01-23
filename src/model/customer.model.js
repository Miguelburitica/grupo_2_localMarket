// let env = process.env
// env.USER ='root' 
// env.DATABASE_PASSWORD = '1234'
// env.DATABASE_NAME = 'LocalMarket'
// env.DATABASE_HOST = '127.0.0.1'
// env.DATABASE_PORT = '3307'

const path = require('path');
// const fs = require('fs');
// const dataCustomers = require('../data/customers.json');
// path Customer JSON

const db=require(path.resolve(__dirname,'../database/models'));

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
    
    createCustomer: async function(user){
       try{
        let newuser={
            user_name:user.email,
            names:user.names,
            surname:user.surname,
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

    updateCustomer: async function(id, user) {
        // fs.writeFileSync(customerFilePath, JSON.stringify(customers, null, 4));
        try{
            console.log(user)
            let updateuser={
                user_name:user.email,
                names:user.names,
                surname:user.surname,
                email:user.email,
                phone:user.phone,
                password:user.password,
                photo:user.photo,
                }
                await db.User.update(updateuser,{where:{id:id}})
        }catch(err){
            console.log(err)
            return err;
        }
    },

    deleteCustomer: async function (id) {
		try {
			await db.User.destroy({ where: { id: id } });
		} catch (err) {
			console.log(err);
		}
	},

    getOne: async function (id) {
		let user = await db.User.findByPk(id, {
			include: ['rol'], 
            where:{
                rols_id:2,
            }
		});
		return user;
	},

}

module.exports = model;

// let a={
//     names:'FFFFudate',
//     surname:'sosa1',
//     email:'Fa@gmail.com',
//     phone:'0056479494',
//     password:'1245676',
//     photo:'user.photo', 
// }
// async function Mostrar(){
//   let x= await model.deleteCustomer(14)
//   console.log(x)
// }

// Mostrar()