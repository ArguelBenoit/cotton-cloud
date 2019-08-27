const jwt = require('jsonwebtoken');
const privateKey = 'wekcLmfQO1%opjdJh$&qQahHBvP';
const user = {
  id: '187020',
  name: 'benoit',
  password: 'arguel'
};


module.exports = (bodyName, bodyPassword) => {
  return new Promise((resolve, reject) => {
    if (
      bodyName === user.name &&
      bodyPassword === user.password &&
      user.id
    ) {
      const token = jwt.sign({ id: user.id }, privateKey);
      resolve(token);
    }
    reject('Error jwt token');
  });
};
