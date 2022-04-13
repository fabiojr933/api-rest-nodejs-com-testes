function adminAuth(req, res, next){
   try {
    if(req.session.autenticate){
        next();
    }else{
        res.redirect('/login');
    }
   } catch (error) {
    var erro = 'Ocorreu algum erro tempo de execução'; 
    res.redirect('/');
   }
}
module.exports = adminAuth;