

export default endFile => {
  const types = {
    archive: ['tar', 'gz', 'tgz', 'zip', 'rar'],
    audio: [''],
    code: [],
    csv: [],
    pdf: [],
    image: [],
    video: [],
    folder: []
  };
  return Object
    .key(types)
    .forEach(type => {
      if (types[type].indexOf(endFile) > 0) {
        return type;
      }
    });
};
