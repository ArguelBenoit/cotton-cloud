import React from 'react';
import PropTypes from 'prop-types';
import request from 'Utils/request';
import Loading from 'Components/loading';
import Highlight, { defaultProps } from 'prism-react-renderer';


class FileViewerContentStatic extends React.Component {
  constructor(props) {
    super(props);
    this.request = this.request.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      base64: null,
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
    const { type, name } = this.props;
    let container;
    switch (type) {
      case 'image':
        container = <img
          className="image"
          src={header + base64}
          style={{
            maxHeight: window.innerHeight - 85,
            maxWidth: window.innerWidth - 30
          }}
        />;
        break;
      case 'pdf':
        container = <object
          className="pdf"
          type="application/pdf"
          data={header + base64}
          style={{
            height: window.innerHeight - 85,
            width: window.innerWidth - 30
          }}
        />;
        break;
      case 'code':
        container = <div className="code" style={{ height: window.innerHeight - 85 }}>
          <Highlight {...defaultProps} code={atob(base64)} language={name.split('.')[1]}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>;
        break;
      case 'sheet':
        container = <div className="sheet"/>;
        break;
      default:
        container = <div />;
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
  type: PropTypes.string,
  name: PropTypes.string
};

export default FileViewerContentStatic;
