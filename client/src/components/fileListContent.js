import React from 'react';
import PropTypes from 'prop-types';
import history from 'Utils/history';
import EventEmitter from 'Utils/eventEmitter';
import {
  FaFile,
  /*
  FaFileAlt,
  FaFileArchive,
  FaFileAudio,
  FaFileCode,
  FaFileCsv,
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  */
  FaFolder
} from 'react-icons/fa';

class FileListContent extends React.Component {
  constructor(props) {
    super(props);
    this.clickElement = this.clickElement.bind(this);
    this.state = {
      count: 0
    };
  }
  clickElement(event) {
    let { count } = this.state;
    let { shortPath, isDirectory } = this.props.info;
    if (count === 1) {
      if (isDirectory) {
        history.push('/?path=' + shortPath + '/');
      } else {
        EventEmitter.dispatch('viewFile', {active: true, index: this.props.index});
      }
    } else {
      let { index } = this.props;
      EventEmitter.dispatch('selectFile', {index, option: event});
      this.setState({
        count: count+1
      });
      setTimeout(
        () => this.setState({ count: 0 }),
        500
      );
    }
  }
  render() {
    const {
      isDirectory,
      size,
      /*
      path,
      shortPath,
      */
      selected,
      name
    } = this.props.info;

    let className = 'fileListContent u-flex-line ';
    isDirectory
      ? className += 'folder '
      : className += 'file ';
    selected
      ? className += 'clicked '
      : '';

    if (isDirectory) {
      return <div draggable className={className} onClick={this.clickElement}>
        <FaFolder />
        <span className="name">{name}</span>
        <span className="size">{size}&#8239;mo</span>
      </div>;
    } else {
      return <div draggable className={className} onClick={this.clickElement}>
        <FaFile />
        <span className="name">{name}</span>
        <span className="size">{size}&#8239;mo</span>
      </div>;
    }
  }
}

FileListContent.propTypes = {
  info: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default FileListContent;
