const express = require('express');
const router = express.Router();
const createToken = require('../functions/createToken');
const checkToken = require('../functions/checkToken');


exports.router = () => {
  return router

    .post('/login', (req, res) => {
      createToken(req.body.name, req.body.password).then(token => {
        res.status(200).json({ token });
      }).catch(err => {
        res.status(401).json({ message: 'Connexion error', err });
      });
    })

    .get('/ping', (req, res) => {
      checkToken(req.headers['authorization']).then(() => {
        res.status(200).json({ message: 'pong' });
      }).catch(() => {
        res.status(401).json({ message: 'Your are not connected' });
      });
    });
};
