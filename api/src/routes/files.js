const express = require('express');
const fs = require('fs-extra');
const tar = require('tar');
const checkToken = require('../functions/checkToken');

const router = express.Router();

const getFileIntoFolder = require('../functions/getFileIntoFolder');
const repository = require('../../config.json')['repository'];
const parsePath = require('../functions/parsePath');



exports.router = () => {
  return router

    .get(/* /files */ '/', (req, res) => {
      checkToken(req.headers['authorization']).then(() => {
        const path = req.param('path');
        if (!path) {
          const files = getFileIntoFolder('/');
          res.status(200).json(files);
        }
        const files = getFileIntoFolder(path);
        res.status(200).json(files);
      }).catch(() => {
        res.status(401).json({ message: 'Your are not connected' });
      });
    })

    // todo :
    // .get(/* /files */ 'download', (req, res) => {
    //   // action
    // })
    // ---
    // .post(/* /files */ 'upload', (req, res) => {
    //   // action
    // })
    // ---

    .post(/* /files */ '/move', (req, res) => {
      const from = req.param('from');
      const to = req.param('to');
      if (!from || !to) {
        res.send('don\'t forget ?from=example/example&to=example/');
      }
      const route = parsePath(repository, from);
      const newRoute = parsePath(repository, to);
      fs.move(route, newRoute)
        .then(() => {
          res.send(`${route} was moved or renamed to ${newRoute}`);
        }).catch(err => {
          res.send(err);
        });
    })

    .post(/* /files */ '/copy', (req, res) => {
      const from = req.param('from');
      const to = req.param('to');
      if (!from || !to) {
        res.send('don\'t forget ?from=example/example&to=example');
      }
      const route = parsePath(repository, from);
      const newRoute = parsePath(repository, to);
      fs.copy(route, newRoute)
        .then(() => {
          res.send(`${newRoute} was created`);
        }).catch(err => {
          res.send(err);
        });
    })

    .post(/* /files */ '/mkdir', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=example/examples');
      }
      const route = parsePath(repository, path);
      fs.mkdir(route)
        .then(() => {
          res.send(`${route} was created`);
        }).catch(err => {
          res.send(err);
        });
    })

    .delete(/* /files */ '/remove', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=example/example.jpg');
      } else {
        const route = parsePath(repository, path);
        fs.remove(route)
          .then(() => {
            res.send(`${route} was removed`);
          }).catch(err => {
            res.send(err);
          });
      }
    })

    // erreur de route sur targz
    .post(/* /files */ '/targz', (req, res) => {
      const path = req.param('path');
      const name = req.param('name');
      if (!path && !name) {
        res.send('don\'t forget ?path=example/example&name=example');
      }
      const route = parsePath(repository, path);
      tar.create({
        gzip: true,
        file: route + '.tar.gz'
      }, [route])
        .then(() => {
          res.send(`${name}.tar.gz was created`);
        }).catch(err => {
          res.send(err);
        });
    })

    .post(/* /files */ '/untar', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=example/example.tar.gz');
      }
      const route = parsePath(repository, path);
      tar.extract({file: route})
        .then(() => {
          res.send(`${path}.tar.gz was unarchived`);
        }).catch(err => {
          res.send(err);
        });
    });
};
