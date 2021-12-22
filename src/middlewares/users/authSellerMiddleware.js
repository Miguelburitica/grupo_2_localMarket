function authSellerMiddleware(req, res, next){
    if(!req.session.sellerLogged){
        return res.redirect('/')  
    }
next(); 
}
module.exports=authSellerMiddleware;