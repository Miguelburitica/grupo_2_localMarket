function authMiddleware(req, res, next){
    console.log(req.session.isUserLogged)
    if(req.session.isUserLogged==false||req.session.isUserLogged==undefined){
      return res.redirect('/users/login')   
    }
    next();
}

module.exports = authMiddleware;