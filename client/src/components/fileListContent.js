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
    const { size, isDirectory, selected, name, type } = this.props.info;

    let className = 'fileListContent u-flex-line ';
    isDirectory
      ? className += 'folder '
      : className += 'file ';
    selected
      ? className += 'clicked '
      : '';

    let _size = {
      size: 0,
      type: 'B'
    };

    if (size < 1000)
      _size = { size, type: 'B'};
    else if (size >= 1000)
      _size = { size: size/1000, type: 'KB'};
    else if (size >= 1000000)
      _size = { size: size/1000000, type: 'MB'};
    else if (size >= 1000000000)
      _size = { size: size/1000000000, type: 'GB'};
    else if (size >= 1000000000000)
      _size = { size: size/1000000000000, type: 'TB'};


    return <div draggable className={className} onClick={this.clickElement}>
      <IconFile type={type}/>
      <span className="name">{name}</span>
      <span className="size">
        {_size.size.toFixed(2)}&#8239;{_size.type}
      </span>
    </div>;
  }
}

FileListContent.propTypes = {
  info: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default FileListContent;
