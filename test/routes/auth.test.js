const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/database/database');
const User = require('../../src/service/Users');

test('Deve receber um token ao logar', async () => {
    const email = `${Date.now()}@gmail.com`;   
    const password = '123';
    await request(app).post('/users').send({ name: 'junior', email: email, password: password });
    return request(app).post('/auth/signin').send({email, password}).then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('autorizacao');        
    });     
});
test('Deve logar com senha errada', async () => {
    const email = `${Date.now()}@gmail.com`;   
    const password = '123';
    await request(app).post('/users').send({ name: 'junior', email: email, password: password });
    return request(app).post('/auth/signin').send({email, password: '123456'}).then((res) => {
        expect(res.status).toBe(400);        
    });     
});
