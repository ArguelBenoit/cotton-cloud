
exports.jsonPromise = val => {
  return new Promise((resolve, reject) => {
    try {
      let json = JSON.parse(val);
      resolve(json);
    } catch(err) {
      reject(err);
    }
  });
};
