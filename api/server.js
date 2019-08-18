const express = require('express');
const app = express();

let server = require('http').createServer(app);
server.listen(process.env.PORT || 81);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ---

const files = require('./src/routes/files').router;
// const zip = require('./src/routes/zip').router;
app.use('/files', files());
// app.use('/zip', zip());
