const jwt = require('jsonwebtoken');
const privateKey = 'wekcLmfQO1%opjdJh$&qQahHBvP';


module.exports = req => {
  return new Promise((resolve, reject) => {

    let token = req.headers['authorization'];
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
