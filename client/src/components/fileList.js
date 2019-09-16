import React from 'react';
import PropTypes from 'prop-types';
import FileListContent from 'Components/fileListContent';
import Path from 'Components/path';
import { FaSortAlphaDown, FaSortAmountUp } from 'react-icons/fa';
import { MdMergeType } from 'react-icons/md';

let FileList = props => {
  const { filesSorted, sort, sortFiles, selectFile, viewFile } = props;
  return <div className="filePage">
    <header className="u-flex-line">
      <Path />
      <div className="u-flex-line sorting">
        <MdMergeType className={sort === 'type' ? 'active' : ''} onClick={() => sortFiles('type')} />
        <FaSortAlphaDown className={sort === 'alpha' ? 'active' : ''} onClick={() => sortFiles('alpha')} />
        <FaSortAmountUp className={sort === 'amount' ? 'active' : ''} onClick={() => sortFiles('amount')} />
      </div>
    </header>
    {filesSorted.map(
      (f, i) => {
        return <FileListContent
          info={f}
          index={i}
          key={i}
          viewFile={(active, path, name) => viewFile(active, path, name)}
          selectFile={(index, option) => selectFile(index, option)}
        />;
      }
    )}
  </div>;
};

FileList.propTypes = {
  filesSorted: PropTypes.array,
  sort: PropTypes.string,
  sortFiles: PropTypes.func,
  selectFile: PropTypes.func,
  viewFile: PropTypes.func
};

export default FileList;
