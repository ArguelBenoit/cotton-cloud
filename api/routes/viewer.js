const express = require('express');
const router = express.Router();
const repository = require('../../config.json')['repository'];
const fs = require('fs');


exports.router = () => {
  return router

    .get('/', (req, res) => {
      let route = req.param('route');
      fs.readdir(repository + route, { withFileTypes: true }, (err, files) => {
        if(err) {
          res.send(repository + route + ' doesn\'t exist');
        } else {
          res.json(files);
        }
      });
    });

};
