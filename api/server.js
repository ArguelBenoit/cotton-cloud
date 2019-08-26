
const express = require('express');
const app = express();

// Options

app.use(express.json());
app.listen(process.env.PORT || 81);

// Routes

const files = require('./src/routes/files').router;
const user = require('./src/routes/user').router;

app.use('/files', files());
app.use('/user', user());
