import React from 'react';
import PropTypes from 'prop-types';
import FileViewerContentStatic from 'Components/fileViewerContentStatic';
import FileViewerContentDynamic from 'Components/fileViewerContentDynamic';
import FileViewerContentInactive from 'Components/fileViewerContentInactive';

let FileViewerContent = props => {
  const { type } = props.file;
  const { file } = props;
  if ( // 'image' || 'pdf' || 'sheet' || 'text' || 'code'
    type === 'image' ||
    type === 'pdf' ||
    type === 'sheet' ||
    type === 'text' ||
    type === 'code'
  ) {
    return <FileViewerContentStatic {...file} />;
  } else if ( // 'audio' || 'video'
    type === 'audio' ||
    type === 'video'
  ) {
    return <FileViewerContentDynamic {...file} />;
  } else { // 'archive' || 'file' || 'folder' || other
    return <FileViewerContentInactive {...file} />;
  }
};

FileViewerContent.propTypes = {
  file: PropTypes.object
};

export default FileViewerContent;
