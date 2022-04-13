const express = require('express');
const route = express.Router();
const UsersController = require('./controller/UsersController');
const AccountController = require('./controller/AccountController');
const AuthController = require('./controller/AuthControllher');


const usersController = new UsersController();
const accountController = new AccountController();
const authController = new AuthController();

//user
route.get('/users', usersController.findAll);
route.post('/users', usersController.createUser);

//Account
route.post('/accounts', accountController.accountCreate)
route.get('/accounts', accountController.accountGetAll);
route.get('/accounts/:id', accountController.get);
route.put('/accounts/:id', accountController.update);
route.delete('/accounts/:id', accountController.remove);

// Auth
route.post('/auth/signin', authController.AuthSignin);
module.exports = route;