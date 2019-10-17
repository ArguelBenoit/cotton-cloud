
// why we don't use a mime type ? because we can't show all type file with html.

const types = {
  video: ['mp4'],
  audio: ['mp3'],
  image: ['jpg', 'jpeg', 'png', 'ico', 'svg', 'gif'],
  text: ['txt'],
  code: ['json', 'js', 'html', 'css', 'jsx', 'php', 'jar'],
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
    let ext = _name[_name.length - 1];
    let arrayOfTypes = Object.keys(types);
    arrayOfTypes.forEach(_type => {
      if (types[_type].indexOf(ext) > -1)
        type = _type;
    });
  }
  return type;
};
