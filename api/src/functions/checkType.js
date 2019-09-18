
const types = {
  image: ['jpg', 'jpeg', 'jpg'],
  video: ['mp4'],
  audio: ['mp3'],
  text: ['txt'],
  sheet: ['csv'],
  pdf: ['pdf'],
  archive: ['zip', 'tar', 'gz', 'tgz']
};

module.exports = name => {
  let _name = name.split('.');
  if (_name.length < 1) {
    return 'text';
  } else {
    Object.keys(types).forEach(_type => {
      if (_type.indexOf(_name(_name.length - 1)) > 0) {
        return _type;
      }
    });
    return 'file';
  }
};
