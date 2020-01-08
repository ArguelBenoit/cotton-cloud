
const types = {
  video: ['mp4'],
  audio: ['mp3'],
  image: ['jpg', 'jpeg', 'png', 'ico', 'svg', 'gif'],
  pdf: ['pdf'],
  code: ['txt', 'sh', 'jar', 'yml', 'rb', 'md', 'py', 'json', 'js', 'html', 'css', 'php', 'jsx', 'vue'], // etc...
  sheet: ['csv'],
  archive: ['zip', 'tar', 'gz', 'tgz']
};

module.exports = name => {
  let _name = name.split('.');
  let type = 'file';
  if (_name.length === 1 || _name[0] === '') {
    type = 'file';
  } else {
    let ext = _name[_name.length - 1];
    let arrayOfTypes = Object.keys(types);
    arrayOfTypes.forEach(_type => {
      if (types[_type].indexOf(ext) > -1)
        type = _type;
    });
  }
  return type;
};
