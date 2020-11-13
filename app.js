const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

if (process.env.NODE_ENV !== 'docker_dev') {
    require('dotenv').config();
}

const logger = require('./middleware/logger');
const usersRouter = require('./routes/users');
const config = require('./config/app-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use('/api/v1/users', usersRouter);

global.logger = logger;
global.config = config;

module.exports = app;
