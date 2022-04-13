const knex = require('../database/database');
const Validation = require('../validation/validationErro');
const bcrypt = require('bcrypt-nodejs');

class Users {
    async findAll() {
        return knex('users').select('*');
    }

    getSenha(pass) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pass, salt);
    };

    async save(user) {
        if (!user.name) throw new Validation('Nome é um atributo obrigatorio'); 
        if (!user.email) throw new Validation('Email é um atributo obrigatorio');
        if (!user.password) throw new Validation('Senha é um atributo obrigatorio');
        const userExiste = await knex('users').where({ email: user.email }).select('*');
        if (userExiste && userExiste.length > 0) throw new Validation('Ja existe um usuario com esse email');
        user.password = this.getSenha(user.password)
        return knex('users').insert(user);
    }
}

module.exports = Users;