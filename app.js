require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const responseError = require('./middlewares/response-error');
const router = require('./routes');
const cors = require('./middlewares/cors');
const { PORT, MONGO, LIMITER } = require('./utils/config');

const app = express();

app.use(cors);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(errorLogger);
app.use(LIMITER);
app.use(cookieParser());

mongoose.connect(MONGO);

app.use(router);

app.use(errors());
app.use(responseError);

app.listen(PORT);
