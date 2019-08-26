const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const privateKey = 'wekcLmfQO1%opjdJh$&qQahHBvP';
const user = {
  id: '187020',
  name: 'benoit',
  password: 'arguel'
};

exports.router = () => {
  return router
    .post('/login', (req, res) => {
      if (req.body.name === user.name && req.body.password === user.password) {
        const token = jwt.sign({ id: user.id }, privateKey);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Connexion error' });
      }
    });
};
