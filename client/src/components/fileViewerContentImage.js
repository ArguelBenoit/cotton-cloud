import React from 'react';
import PropTypes from 'prop-types';
import request from 'Utils/request';

class FileViewerContentImage extends React.Component {
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
    this.request(this.props.shortPath);
  }
  componentDidUpdate(prevProps) {
    const { shortPath } = this.props;
    if (prevProps.shortPath !== shortPath) {
      return this.request(shortPath);
    } else if (prevProps.shortPath !== shortPath) {
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
    const { base64, header } = this.state;
    return <img src={header + base64} width="100%" />;
  }
}

FileViewerContentImage.propTypes = {
  shortPath: PropTypes.string
};

export default FileViewerContentImage;
