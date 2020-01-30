require('dotenv').config({ path: './_configs/.env' });

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers').errorHandler;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// use JWT auth to secure the api
app.use(jwt());

const userRouter = require('./_routes').user;
const hakaksesRouter = require('./_routes').hakakses;
const matauangRouter = require('./_routes').matauang;
const customerRouter = require('./_routes').customer;
const penawaranRouter = require('./_routes').penawaran;

// api routes
app.use(`/api/v${process.env.API_VERSION}/users`, userRouter);
app.use(`/api/v${process.env.API_VERSION}/hak-akses`, hakaksesRouter);
app.use(`/api/v${process.env.API_VERSION}/mata-uang`, matauangRouter);
app.use(`/api/v${process.env.API_VERSION}/customer`, customerRouter);
app.use(`/api/v${process.env.API_VERSION}/penawaran`, penawaranRouter);

// global error handler
app.use(errorHandler);

// start server
app.set('port', process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000);
app.listen(app.get('port'), function () {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;