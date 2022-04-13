const request = require('supertest');
const knex = require('../../src/database/database');
const app = require('../../src/app');
const MAIN_ROUTE = '/accounts';
const User = require('../../src/service/Users');

const user = new User();
let users;

beforeAll(async () => {
    await user.save({ name: 'User account', email: `${Date.now()}@gmail.com`, password: '1234' });
    const id = await user.findAll();
    users = { ...id[0] };
});
test('Deve inserir uma conta', () => {
    return request(app).post(MAIN_ROUTE).send({ name: 'AC1', user_id: users.id }).then((result) => {
        expect(result.status).toBe(201);
    });
});
test('Deve listar todas as contas', () => {
    return request(app).post(MAIN_ROUTE).send({ name: 'AC1', user_id: users.id }).then(() => request(app).get(MAIN_ROUTE)).then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
test('Deve retornar uma conta por ID', () => {
    return knex('account').insert({ name: 'AC1', user_id: users.id }, ['id']).then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)).then((res) => {
        expect(res.status).toBe(200);
    });
});
test('Não deve inserir uma conta sem nome', () => {
    return request(app).post('/accounts').send({ user_id: users.id }).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Nome é um atributo obrigatorio');
    });
});
test('Não deve inserir uma conta sem usuario', () => {
    return request(app).post(MAIN_ROUTE).send({ name: 'conta abc' }).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Você precisa informar um usuario');
    });
});
test('Deve alterar um conta', () => {
    return knex('account').insert({ name: 'AC1-alterar', user_id: users.id }, ['id']).then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
    .send({name: 'Alterado!!'})).then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Alterado!!');
    });
});
test('Não Deve alterar um conta sem o nome', () => {
    return knex('account').insert({ name: 'AC1-alterar', user_id: users.id }, ['id']).then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
    .send({ })).then((res) => {
        expect(res.status).toBe(400);
    });
});
test('Não Deve alterar um conta sem o id ', () => {
    return knex('account').insert({ name: 'AC1-alterar', user_id: users.id }, ['id']).then(acc => request(app).put(`${MAIN_ROUTE}/`)
    .send({ })).then((res) => {
        expect(res.status).toBe(404);
    });
});
test('Deve remover uma conta', () => {
    return knex('account').insert({ name: 'AC1-alterar', user_id: users.id }, ['id']).then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)).then((res) => {
        console.log(res.status)
        expect(res.status).toBe(204);
    });
});
