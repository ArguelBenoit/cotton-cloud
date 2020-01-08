import React from 'react';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';

let FileViewerContentInactive = props => {
  let { type, name, shortPath, size } = props;
  return <div className="viewerInactive">
    <div className="content">
      <IconFile type={type} /><br/>
      Type: {type}<br/>
      Name: {name}<br/>
      Path: {shortPath}<br/>
      Size: {size}
    </div>
  </div>;
};

FileViewerContentInactive.propTypes = {
  file: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string,
  shortPath: PropTypes.string,
  size: PropTypes.number
};

export default FileViewerContentInactive;
