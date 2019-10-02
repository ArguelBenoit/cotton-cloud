const express = require('express');
const router = express.Router();
const checkToken = require('../functions/checkToken');
const checkType = require('../functions/checkType');
const parsePath = require('../functions/parsePath');
const cloudPath = require('../../config.json')['cloudPath'];
const fs = require('fs');
const mime = require('mime');


let getExt = path => {
  let array = path.split('.');
  if (array.length === 1 || array === '')
    return 'txt';
  else
    return array[1];
};


exports.router = () => {
  return router

    .get(/* /file */ '/base64', (req, res) => {
      checkToken(req.headers['authorization']).then(() => {
        const path = req.param('path');
        if (!path) {
          res.send('don\'t forget ?path=example/example/');
        }
        let buff = fs.readFileSync(parsePath(cloudPath, path));
        let base64data = buff.toString('base64');
        let jsonReturned = {
          type: checkType(path),
          base64: base64data,
          typeMIME: mime.getType(getExt(path)),
          header: `data:${mime.getType(getExt(path))};base64, `
        };
        res.status(200).json(jsonReturned);
      }).catch(() => {
        res.status(401).json({message: 'Your are not connected' });
      });
    });

    // .get(/* /file */ '/', (req, res) => {
    //   checkToken(req.headers['authorization']).then(() => {});
    // })

    // .post(/* /file */ '/upload', (req, res) => {});
};
