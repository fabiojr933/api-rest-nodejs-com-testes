const knex = require('../database/database');
const Validation = require('../validation/validationErro');

class Account {
    async accountCreate(account) {
        if (!account.name) throw new Validation('Nome é um atributo obrigatorio');
        if (!account.user_id) throw new Validation('Você precisa informar um usuario');
        return knex('account').insert(account);
    }
    async accountfindALL() {
        return knex('account').select('*');
    }
    async find(id) {
        return knex('account').where(id).first();
    }
    async update(id, body){
        if(!id) throw new Validation('Id do cliente é obrigatorio');
        if(!body.name) throw new Validation('Nome do cliente é obrigatorio');
        return knex('account').update(body).where({id});
    }
    async remove(id){       
        return knex('account').where({id}).del();
    }
}

module.exports = Account;