const jwt = require('jsonwebtoken');
const privateKey = 'wekcLmfQO1%opjdJh$&qQahHBvP';


module.exports = (bodyName, bodyPassword, user) => {
  return new Promise((resolve, reject) => {
    try {
      if (bodyName === user.name && bodyPassword === user.password && user.id) {
        const token = jwt.sign({ id: user.id }, privateKey);
        resolve(token);
      }
    } catch(err) {
      reject(err);
    }
  });
};
