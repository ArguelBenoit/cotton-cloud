
const express = require('express');
const app = express();

const files = require('./src/routes/files').router;
const user = require('./src/routes/user').router;

// ---

app.listen(process.env.PORT || 81);

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/user', user());
app.use('/files', files());
