const express = require('express');
const router = express.Router();
const checkToken = require('../functions/checkToken');
const fs = require('fs-extra');

// todo
exports.router = () => {
  return router

    .get(/* disk */ '/', (req, res) => {
      // checkToken(req.headers['authorization']).then(() => {

        let fileState = fs.statSync('/');
        console.log(fileState);
        res.status(200).json({ message: fileState });
      // }).catch(() => {
      //   res.status(401).json({ message: 'Your are not connected' });
      // });
    });

};
