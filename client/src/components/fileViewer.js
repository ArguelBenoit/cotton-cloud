import React from 'react';
import EventEmitter from 'Utils/eventEmitter';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';
import FileViewerContent from 'Components/fileViewerContent';

let FileViewer = props => {
  const { files, index } = props;
  return <div className="fileViewer">
    <header className="u-flex-line">
      <MdClose className="navIcon" onClick={() => EventEmitter.dispatch('viewFile', {active: false, index: null})} />
      <IconFile className="iconType" type={files[index].type} />
      {files[index].name}
    </header>
    <FileViewerContent file={files[index]} />
    <FaArrowLeft
      className={'navIcon left ' + (index === 0 ? 'unActive' : '')}
      onClick={() => EventEmitter.dispatch('viewFile', {active: true, index: index-1})}
    />
    <FaArrowRight
      className={'navIcon right ' + (index === files.length - 1 ? 'unActive' : '')}
      onClick={() => EventEmitter.dispatch('viewFile', {active: true, index: index+1})}
    />
  </div>;
};

FileViewer.propTypes = {
  files: PropTypes.array,
  index: PropTypes.number
};

export default FileViewer;
