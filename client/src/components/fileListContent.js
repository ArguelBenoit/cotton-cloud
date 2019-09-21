import React from 'react';
import PropTypes from 'prop-types';
import history from 'Utils/history';
import EventEmitter from 'Utils/eventEmitter';
import IconFile from 'Components/iconFile';

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
    const { index } =this.props;
    let { shortPath, isDirectory } = this.props.info;
    if (count === 1) {
      if (isDirectory) {
        history.push('/?path=' + shortPath + '/');
      } else {
        EventEmitter.dispatch('viewFile', {active: true, index});
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
      selected,
      name,
      type
      /*
      path,
      shortPath,
      */
    } = this.props.info;

    let className = 'fileListContent u-flex-line ';
    isDirectory
      ? className += 'folder '
      : className += 'file ';
    selected
      ? className += 'clicked '
      : '';

    return <div draggable className={className} onClick={this.clickElement}>
      <IconFile type={type}/>
      <span className="name">{name}</span>
      <span className="size">{size}&#8239;mo</span>
    </div>;
  }
}

FileListContent.propTypes = {
  info: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default FileListContent;
