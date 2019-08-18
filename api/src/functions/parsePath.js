
module.exports = (left, right) => {
  if (left[left.length - 1] === '/' && right[0] !== '/')
    return left + right;
  else if (left[left.length - 1] !== '/' && right[0] === '/')
    return left + right;
  else if (left[left.length - 1] !== '/' && right[0] !== '/')
    return left + '/' + right;
  else if (left[left.length - 1] === '/' && right[0] === '/')
    return left + [-1] + right.substr(1);
  else
    return left + right;
};
