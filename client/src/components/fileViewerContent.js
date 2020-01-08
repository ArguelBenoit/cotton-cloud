import React from 'react';
import PropTypes from 'prop-types';
import FileViewerContentStatic from 'Components/fileViewerContentStatic';
import FileViewerContentDynamic from 'Components/fileViewerContentDynamic';
import FileViewerContentInactive from 'Components/fileViewerContentInactive';

let FileViewerContent = props => {
  const { type } = props.file;
  const { file } = props;
  if (
    type === 'image' ||
    type === 'pdf' ||
    type === 'code' ||
    type === 'sheet'
  ) {
    return <FileViewerContentStatic {...file} />;
  } else if (
    type === 'audio' ||
    type === 'video'
  ) {
    return <FileViewerContentDynamic {...file} />;
  } else { // 'archive' || 'folder' || 'file' || 'unknow'
    return <FileViewerContentInactive {...file} />;
  }
};

FileViewerContent.propTypes = {
  file: PropTypes.object
};

export default FileViewerContent;
