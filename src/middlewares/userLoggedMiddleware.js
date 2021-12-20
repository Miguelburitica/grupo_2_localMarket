const { userController } = require('../controllers');
const path = require('path');
const fs = require('fs');
// Se traen estas fns del userController para buscar a cada usuario en su DB. Toca meterlas en el modelo para usarlas aquí también.
function getSellers() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/sellers.json'), 'utf-8'));
}

function getCustomers() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/customers.json'), 'utf-8'));
}

function findByEmailSeller(email) {
	const allSellers = getSellers();
	const foundSeller = allSellers.find((item) => item.email === email);
	return foundSeller;
}
function findByEmailCustomer(email) {
	const allCustomers = getCustomers();
	const foundCustomer = allCustomers.find((item) => item.email === email);
	return foundCustomer;
}

function userLoggedMiddleware(req, res, next){
     res.locals.isLogged = false;

     let emailInCookie = req.cookies.userEmail; // guardamos el email recogido en la cookie del userController
    
     let userFromCookieCustomer = findByEmailCustomer(emailInCookie);
     let userFromCookieSeller = findByEmailSeller(emailInCookie); // buscamos el usuario por email
     if(userFromCookieCustomer){
        req.session.customerLogged = userFromCookieCustomer;
     }else if(userFromCookieSeller){
        req.session.sellerLogged = userFromCookieSeller;
     } // Aquí guardamos el email en el session, si caduca la cookie, no se desloguea.

     //esto permite que solo el usuario logueado vea el perfil.
     if(req.session.isUserLogged){
         res.locals.isLogged=true;
        //  Con esto estamos mandando los datos a las vistas.
         if(req.session.customerLogged){
             res.locals.userLogged = req.session.customerLogged
             res.locals.customerLogged=req.session.customerLogged
         }else if(req.session.sellerLogged){
            res.locals.userLogged = req.session.sellerLogged
            res.locals.sellerLogged=req.session.sellerLogged
     }
     
    }
    next();
}
module.exports = userLoggedMiddleware;