const { userController } = require('../controllers');


function userLoggedMiddleware(req, res, next){
     res.locals.isLogged = false;
     //esto permite que solo el usuario logueado vea el perfil
     if(req.session.isUserLogged){
         res.locals.isLogged=true;
     }

     let emailInCookie = req.cookies.userEmail;
     let userFromCookie = userController.findByEmailCustomer(emailInCookie); //esta parte esta mal aquí quedamos
     console.log(userFromCookie);
    next();
}
module.exports = userLoggedMiddleware;