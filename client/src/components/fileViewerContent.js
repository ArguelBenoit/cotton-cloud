import React from 'react';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';
import FileViewerContentImage from 'Components/fileViewerContentImage';

class FileViewerContent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { file } = this.props;
    let dom;
    switch (file.type) {
      case 'image':
        dom = <FileViewerContentImage {...file} />;
        break;
      default:
        dom = <div>
          <IconFile type={file.type} /><br/>
          Type: {file.type}<br/>
          Name: {file.name}<br/>
          Path: {file.shortPath}<br/>
          Size: {file.size}
        </div>;
    }
    return dom;
  }
}

FileViewerContent.propTypes = {
  file: PropTypes.object,
  shortPath: PropTypes.string
};

export default FileViewerContent;
