import React from 'react';
import PropTypes from 'prop-types';
import FileListContent from 'Components/fileListContent';
import Path from 'Components/path';
import { FaSortAlphaDown, FaSortAmountUp } from 'react-icons/fa';
import { MdMergeType } from 'react-icons/md';
import EventEmitter from 'Utils/eventEmitter';

let FileList = props => {
  const { filesSorted, sort } = props;
  return <div className="filePage">
    <header className="u-flex-line">
      <Path />
      <div className="u-flex-line sorting">
        <MdMergeType className={sort === 'type' ? 'active' : ''} onClick={() => EventEmitter.dispatch('sortFile', 'type')} />
        <FaSortAlphaDown className={sort === 'alpha' ? 'active' : ''} onClick={() => EventEmitter.dispatch('sortFile', 'alpha')} />
        <FaSortAmountUp className={sort === 'amount' ? 'active' : ''} onClick={() => EventEmitter.dispatch('sortFile', 'amount')} />
      </div>
    </header>
    {filesSorted.map(
      (f, i) => {
        return <FileListContent
          info={f}
          index={i}
          key={i}
        />;
      }
    )}
  </div>;
};

FileList.propTypes = {
  filesSorted: PropTypes.array,
  sort: PropTypes.string
};

export default FileList;
