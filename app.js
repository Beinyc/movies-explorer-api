const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimit');
const router = require('./routes/index');
const { PORT, DB } = require('./utils/config');

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
});

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
