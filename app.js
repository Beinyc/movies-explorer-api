require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT, MONGO, LIMITER } = require('./utils/config');
const responseError = require('./middlewares/response-error');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

app.use(cors);
app.use(express.json());
app.use(helmet());
app.use(LIMITER);
app.use(cookieParser());

mongoose.connect(MONGO);

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(responseError);

app.listen(PORT);
