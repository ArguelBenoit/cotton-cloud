
const types = {
  image: ['jpg', 'jpeg', 'png', 'ico', 'svg'],
  video: ['mp4'],
  audio: ['mp3'],
  text: ['txt'],
  code: ['json', 'js', 'html', 'jsx', 'php', 'jar'],
  sheet: ['csv'],
  pdf: ['pdf'],
  archive: ['zip', 'tar', 'gz', 'tgz']
};

module.exports = name => {
  let _name = name.split('.');
  let type = 'file';
  if (_name.length === 1 || _name[0] === '') {
    type = 'file';
  } else {
    Object.keys(types).forEach(_type => {
      if (types[_type].indexOf(_name[_name.length - 1]) > 0)
        type = _type;
    });
  }
  return type;
};
