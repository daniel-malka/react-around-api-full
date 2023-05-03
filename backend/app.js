const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { router } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const { PORT = 3001 } = process.env;

const path = require('path'); // Add this line

mongoose.connect('mongodb://localhost:27017/mydb');

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.use(router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

app.use(errorLogger);
