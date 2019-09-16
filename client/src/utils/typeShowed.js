

const types = {
  archive: [
    'tar',
    'gz',
    'tgz',
    'zip'
  ],
  audio: ['mp3, ogg'],
  code: [''],
  csv: [],
  pdf: ['pdf'],
  image: [],
  video: ['mp4', 'webm', 'ogg']
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
