import React from 'react';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';
import request from 'Utils/request';

class FileViewerContent extends React.Component {
  constructor(props) {
    super(props);
    this.request = this.request.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      base64: null,
      typeMIME: null,
      type: null,
      header: null
    };
  }
  componentDidMount() {
    if(this.props.file.type === 'image') {
      this.request(this.props.file.shortPath);
    }
  }
  componentDidUpdate(prevProps) {
    const { file } = this.props;
    if (
      prevProps.file.shortPath !== file.shortPath &&
      file.type === 'image')
    {
      return this.request(file.shortPath);
    } else if (
      prevProps.file.shortPath !== file.shortPath &&
      file.type !== 'image')
    {
      this.resetState();
    }
  }
  resetState() {
    this.setState({
      base64: null,
      typeMIME: null,
      type: null,
      header: null
    });
  }
  request(path) {
    request('get', `/file/base64?path=${path}`).then(res => {
      this.setState({
        base64: res.data.base64,
        typeMIME: res.data.typeMIME,
        type: res.data.typeMIME,
        header: res.data.header
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const { file } = this.props;
    const { base64, header } = this.state;
    let dom;
    switch (file.type) {
      case 'image':
        dom = <img src={header + base64} width="100%" />;
        break;
      default:
        dom = <div>
          <IconFile type={file.type} /><br/>
          Type: {file.type}<br/>
          Name: {file.name}<br/>
          Path: {file.shortPath}<br/>
          Size: {file.size}
        </div>;
    }
    return dom;
  }
}

FileViewerContent.propTypes = {
  file: PropTypes.object,
  shortPath: PropTypes.string
};

export default FileViewerContent;
