function guestMiddleware(req, res, next){

    if(req.session.sellerLogged){
        return res.redirect('/users/seller');
    }else if(req.session.customerLogged){
        return res.redirect('/users/customer');
    }
    next();
}

module.exports = guestMiddleware;