import React from 'react';
import PropTypes from 'prop-types';
import {
  FaFile,
  FaFolder,
  FaFileAlt,
  FaFileArchive,
  FaFileAudio,
  FaFileCode,
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  FaFileInvoice
} from 'react-icons/fa';

let IconFile = props => {
  switch (props.type) {
    case 'image':
      return <FaFileImage className="iconFile" />;
    case 'video':
      return <FaFileVideo className="iconFile" />;
    case 'audio':
      return <FaFileAudio className="iconFile" />;
    case 'text':
      return <FaFileAlt className="iconFile" />;
    case 'code':
      return <FaFileCode className="iconFile" />;
    case 'pdf':
      return <FaFilePdf className="iconFile" />;
    case 'archive':
      return <FaFileArchive className="iconFile" />;
    case 'sheet':
      return <FaFileInvoice className="iconFile" />;
    case 'directory':
      return <FaFolder className="iconFile" />;
    default:
      return <FaFile className="iconFile" />;
  }
};

IconFile.propTypes = {
  type: PropTypes.string.isRequired
};

export default IconFile;
