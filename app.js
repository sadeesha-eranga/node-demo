const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('./config/logger');
const usersRouter = require('./routes/users');
const config = require('./config/app-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/users', usersRouter);

global.logger = logger;
global.config = config;

module.exports = app;
