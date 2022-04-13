const knex = require('../database/database');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const validationErro = require('../validation/validationErro');


class Auth {
    async AuthSignin(email, pass) {
        var token;
        await knex('users').where({ email: email }).first().then(res => {
            if (bcrypt.compareSync(pass, res.password)) {
                const payload = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                };
                console.log(payload)
                token = jwt.encode(payload, 'segredo');

            } else {
                return validationErro('Senha errada');
            }
        });
        return token;
    }
}
module.exports = Auth;