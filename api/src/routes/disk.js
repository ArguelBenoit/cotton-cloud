const express = require('express');
const router = express.Router();
const fs = require('fs-extra');

exports.router = () => {
  return router

    .get(/* disk */ '/', (req, res) => {
      let fileState = fs.statSync('/');
      console.log(fileState);
      res.status(200).json({...fileState});
    });

};
