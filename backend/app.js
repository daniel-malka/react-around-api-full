require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { router } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewars/logger');

const { PORT = 3001, MONGO_URL = 'mongodb://localhost:27017/mydb' } =
  process.env;
const app = express();
mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

~
~
~
~
~
~
~
~