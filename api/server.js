let express = require('express');
let app = express();

let server = require('http').createServer(app);
server.listen(process.env.PORT || 81);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// essayer d'afficher cette action à la racine. "app.use('/', viewe..."
const viewer = require('./routes/viewer').router;
app.use('/viewer', viewer());

// const tafForecastRouter = require('./routes/tafForecastRouter').router;
// app.use('/v2/taf-forecast', tafForecastRouter(db));
