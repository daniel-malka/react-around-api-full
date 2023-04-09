const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { router } = require('./routes');
const { auth } = require('./middlewars/auth');
const { PORT = 3001 } = process.env;
app.use(express());

mongoose.connect('mongodb://localhost:27017/aroundtheus');
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
