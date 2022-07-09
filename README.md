# api-rest-nodejs-com-testes

API REST em Node.JS aplicando testes (TDD) desde o princípio


# Api 
- projeto realizado no curso 
https://www.udemy.com/course/api-rest-nodejs-com-testes
API REST em Node.JS aplicando testes (TDD) desde o princípio

#### Instale as dependências

```sh
npm install
```

#### Criando o migration

```sh
.\node_modules\.bin\knex migrate:make create_users --env test
```
#### Criando as tabelas e colunas

```sh
.\node_modules\.bin\knex migrate:latest --env testt
```

#### Execute a aplicação localmente

```sh
npm run dev
```

#### Execute os Testes

```sh
npm run test
```

## Tecnologias utilizadas:
- Nodejs
- Express
- PostgreSQL
- Jest
