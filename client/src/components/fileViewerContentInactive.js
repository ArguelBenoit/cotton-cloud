import React from 'react';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';

let FileViewerContentInactive = props => {
  let { file } = props;
  return <div>
    <IconFile type={file.type} /><br/>
    Type: {file.type}<br/>
    Name: {file.name}<br/>
    Path: {file.shortPath}<br/>
    Size: {file.size}
  </div>;
};

FileViewerContentInactive.propTypes = {
  file: PropTypes.object
};

export default FileViewerContentInactive;
