import React from 'react';
import PropTypes from 'prop-types';
import request from 'Utils/request';
import Loading from 'Components/loading';

class FileViewerContentStatic extends React.Component {
  constructor(props) {
    super(props);
    this.request = this.request.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      base64: null,
      typeMIME: null,
      type: null,
      header: null,
      loaded: false
    };
  }
  componentDidMount() {
    this.request(this.props.shortPath);
  }
  componentDidUpdate(prevProps) {
    const { shortPath } = this.props;
    if (prevProps.shortPath !== shortPath) {
      return this.request(shortPath);
    }
  }
  resetState() {
    this.setState({
      base64: null,
      typeMIME: null,
      type: null,
      header: null,
      loaded: false
    });
  }
  request(path) {
    this.setState({loaded: false});
    request('get', `/file/base64?path=${path}`).then(res => {
      this.setState({
        base64: res.data.base64,
        typeMIME: res.data.typeMIME,
        type: res.data.typeMIME,
        header: res.data.header,
        loaded: true
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const { base64, header, loaded } = this.state;
    console.log('render static', header, base64);
    const { type } = this.props;
    let container;
    switch (type) {
      case 'image':
        container = <img
          src={header + base64}
          style={{
            maxHeight: window.innerHeight - 85,
            maxWidth: window.innerWidth - 30
          }}
        />;
        break;
      case 'pdf'/* || 'sheet' || 'text' || 'code'*/:
        container = <object
          type="application/pdf"
          data={header + base64}
          style={{
            height: window.innerHeight - 85,
            width: window.innerWidth - 30
          }}
        />;
        // container = <img
        //   className="viewerStaticImg"
        //   src={header + base64}
        //   style={{
        //     maxHeight: window.innerHeight - 85,
        //     maxWidth: window.innerWidth - 30
        //   }}
        // />;
        break;
      default:
        container = <object />;
    }
    return <div
      className="viewerStatic"
      style={{
        height: '100%'
      }}
    >
      {!loaded ? <Loading /> : ''}
      {base64
        ? container
        : ''
      }
    </div>;
  }
}

FileViewerContentStatic.propTypes = {
  shortPath: PropTypes.string,
  type: PropTypes.string
};

export default FileViewerContentStatic;
