

const types = {
  archive: [
    'tar',
    'gz',
    'tgz',
    'zip',
    'rar'
  ],
  audio: [],
  code: [],
  csv: [],
  pdf: ['pdf'],
  image: [],
  video: [],
  folder: []
};

export default endFile => {
  return Object
    .key(types)
    .forEach(type => {
      if (types[type].indexOf(endFile) > 0) {
        return type;
      }
    });
};
