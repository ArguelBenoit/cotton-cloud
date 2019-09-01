import React from 'react';
import PropTypes from 'prop-types';
import history from 'Utils/history';
import { FaFile, FaFileAlt, FaFileArchive, FaFileAudio, FaFileCode, FaFileCsv, FaFilePdf, FaFileImage, FaFileVideo, FaFolder } from 'react-icons/fa';

class ContentFile extends React.Component {
  constructor(props) {
    super(props);
    this.selectElement = this.selectElement.bind(this);
    this.clickElement = this.clickElement.bind(this);
    this.state = {
      clicked: false,
      count: 0
    };
  }
  selectElement() {
    let { clicked } = this.state;
    this.setState({ clicked: !clicked });
  }
  clickElement() {
    let { count } = this.state;
    let { shortPath, isDirectory, name } = this.props.info;
    if (count === 1) {
      if (isDirectory) {
        history.push('/?path=' + shortPath + '/');
      } else {
        alert('ouverture du fichier ' + name);
      }
    } else {
      this.selectElement();
      this.setState({ count: count+1 });
      setTimeout(() => this.setState({ count: 0 }), 500);
    }
  }
  render() {
    const {
      isDirectory,
      size,
      path,
      shortPath,
      selected,
      name
    } = this.props.info;
    const { clicked } = this.state;

    let className = 'contentFile u-flex-line ';
    isDirectory
      ? className += 'folder '
      : className += 'file ';
    clicked
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

ContentFile.propTypes = {
  info: PropTypes.object.isRequired
};

export default ContentFile;
