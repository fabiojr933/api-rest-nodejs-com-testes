const request = require('supertest');
const { getMaxListeners } = require('../../src/app');
const app = require('../../src/app');

const email = `${Date.now()}@gmail.com`;

test('Deve listar todos usuario', () => {
    return request(app).get('/users').then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir novo usuario', () => {
    return request(app).post('/users').send({ name: 'junior', email: email, password: '123' }).then((res) => {
        expect(res.status).toBe(201);
    });
});
test('Não deve inserir usuario sem nome', () => {
    return request(app).post('/users').send({ email: null, password: '123' }).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Nome é um atributo obrigatorio');
    });
});
test('Não deve inserir usuario sem email', async () => {
    const result = await request(app).post('/users').send({ name: 'junior', password: '123' });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email é um atributo obrigatorio');
});
test('Não deve inserir usuario sem senha', (done) => {
    request(app).post('/users').send({ name: 'junior', email: 'fa@getMaxListeners.com' }).then((result) => {
        expect(result.status).toBe(400);
        expect(result.body.error).toBe('Senha é um atributo obrigatorio');
        done();
    });
});
test('Não deve inserir um email já existente', () => {
    return request(app).post('/users').send({ name: 'junior', email: email, password: '123' }).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Ja existe um usuario com esse email');
    });
});
