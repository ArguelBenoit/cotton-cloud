import React from 'react';
import PropTypes from 'prop-types';
import FileViewerContentStatic from 'Components/fileViewerContentStatic';
import FileViewerContentDynamic from 'Components/fileViewerContentDynamic';
import FileViewerContentInactive from 'Components/fileViewerContentInactive';

let FileViewerContent = props => {
  const { file } = props;
  let dom;
  switch (file.type) {
    case 'image' || 'pdf' || 'sheet' || 'text' || 'code':
      dom = <FileViewerContentStatic {...file} />;
      break;
    case 'video' || 'audio':
      dom = <FileViewerContentDynamic {...file} />;
      break;
    case 'archive' || 'file':
      dom = <FileViewerContentInactive {...file} />;
      break;
    default:
      dom = <FileViewerContentInactive {...file} />;
  }
  return dom;
};

FileViewerContent.propTypes = {
  file: PropTypes.object
};

export default FileViewerContent;
