const jwt = require('jsonwebtoken');
const {
  privateKey,
  userId,
  userName,
  userPassword
} = require('../../config.json');


module.exports = (bodyName, bodyPassword) => {
  return new Promise((resolve, reject) => {
    if (
      bodyName === userName &&
      bodyPassword === userPassword &&
      userId
    ) {
      const token = jwt.sign({ id: userId }, privateKey);
      resolve(token);
    }
    reject('Error jwt token');
  });
};
