const express = require('express');
const fs = require('fs-extra');
const tar = require('tar');

const router = express.Router();

const getFileIntoFolder = require('../functions/getFileIntoFolder');
const repository = require('../../../config.json')['repository'];
const parsePath = require('../functions/parsePath');



exports.router = () => {
  return router

    .get('/', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=/example/example');
      }
      const files = getFileIntoFolder(path);
      res.json(files);
    })

    // todo :
    // .get('download', (req, res) => {
    //   // action
    // })
    // ---
    // .post('upload', (req, res) => {
    //   // action
    // })
    // ---

    .post('/move', (req, res) => {
      const from = req.param('from');
      const to = req.param('to');
      if (!from || !to) {
        res.send('don\'t forget ?from=/example/example&to=/example');
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

    .post('/copy', (req, res) => {
      const from = req.param('from');
      const to = req.param('to');
      if (!from || !to) {
        res.send('don\'t forget ?from=/example/example&to=/example');
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

    .post('/mkdir', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=/example/example');
      }
      const route = parsePath(repository, path);
      fs.mkdir(route)
        .then(() => {
          res.send(`${route} was created`);
        }).catch(err => {
          res.send(err);
        });
    })

    .delete('/remove', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=/example/example.jpg');
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

    .post('/targz', (req, res) => {
      const path = req.param('path');
      const name = req.param('name');
      if (!path && !name) {
        res.send('don\'t forget ?path=/example/example&name=example');
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

    .post('/untar', (req, res) => {
      const path = req.param('path');
      if (!path) {
        res.send('don\'t forget ?path=/example/example.tar.gz');
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
