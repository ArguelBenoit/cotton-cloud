const jwt = require('jsonwebtoken');
const privateKey = 'wekcLmfQO1%opjdJh$&qQahHBvP';


module.exports = token => {
  return new Promise((resolve, reject) => {

    if (!token) {
      reject();
    }

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      }
      resolve();
    });

  });
};
