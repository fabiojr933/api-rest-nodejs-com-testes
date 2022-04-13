const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

/** Visualizar os sql do knex{*
 *    const knexConfig = require('./database/database');
 *   const knexlogger = require('knex-logger');
 *   app.use(knexlogger(knexConfig));
 * 
 * } */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(routes);
app.get('/', (req, res) => {
    res.status(200).send();
});

module.exports = app;