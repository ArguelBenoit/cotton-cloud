const fs = require('fs-extra');
const repository = require('../../config.json')['repository'];
const parsePath = require('./parsePath');

module.exports = route => {
  const _route = parsePath(repository, route);
  const files = fs.readdirSync(_route, 'utf8');
  let response = [];
  for (let file of files) {
    let __route = parsePath(_route, file);
    fs.statSync(__route).then(res => {
      response.push({
        name: file,
        path: __route,
        size: res.size,
        directory: res.isDirectory()
      });
    });
  }
  return response;
};
