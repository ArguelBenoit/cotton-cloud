const fs = require('fs-extra');
const cloudPath = require('../../config.json')['cloudPath'];
const parsePath = require('./parsePath');
const checkType = require('./checkType');

module.exports = route => {
  const _route = parsePath(cloudPath, route);
  const files = fs.readdirSync(_route, 'utf8');
  let response = [];
  for (let file of files) {
    let __route = parsePath(_route, file);
    let fileState = fs.statSync(__route);
    response.push({
      name: file,
      path: __route,
      shortPath: (route + file),
      size: fileState.size,
      isDirectory: fileState.isDirectory(),
      type: !fileState.isDirectory() ? file.split('.').pop() : 'directory',
      selected: false
    });
    console.log(checkType(file));
  }
  return response;
};
