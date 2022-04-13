const Auth = require('../service/Auth');

class AuthController {
    async AuthSignin(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const auth = new Auth();
        const autorizacao = await auth.AuthSignin(email, password);
        if (autorizacao === '' || autorizacao === undefined) return res.status(400).json({ error: 'Senha ou Email Invalido' });
        return res.status(200).json({ autorizacao });
    }
}

module.exports = AuthController;