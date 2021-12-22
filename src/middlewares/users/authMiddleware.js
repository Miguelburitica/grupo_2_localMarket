function authMiddleware(req, res, next){
    if(req.session.isUserLogged==false||req.session.isUserLogged==undefined){
      return res.redirect('/users/login')   
    }
    next();
}

module.exports = authMiddleware;