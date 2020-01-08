
import React from 'react';
import PropTypes from 'prop-types';
// import request from 'Utils/request';
import Loading from 'Components/loading';

class FileViewerContentDynamic extends React.Component {
  constructor(props) {
    super(props);
    // this.request = this.request.bind(this);
    // this.resetState = this.resetState.bind(this);
    this.state = {
      // base64: null,
      // typeMIME: null,
      // type: null,
      // header: null,
      loaded: false
    };
  }
  // componentDidMount() {
    // this.request(this.props.shortPath);
  // }
  // componentDidUpdate(prevProps) {
    // const { shortPath } = this.props;
    // if (prevProps.shortPath !== shortPath) {
    //   return this.request(shortPath);
    // }
  // }
  // resetState() {
    // this.setState({
    //   base64: null,
    //   typeMIME: null,
    //   type: null,
    //   header: null,
    //   loaded: false
    // });
  // }
  // request(path) {
    // this.setState({loaded: false});
    // request('get', `/file/base64?path=${path}`).then(res => {
    //   this.setState({
    //     base64: res.data.base64,
    //     typeMIME: res.data.typeMIME,
    //     type: res.data.typeMIME,
    //     header: res.data.header,
    //     loaded: true
    //   });
    // }).catch(err => {
    //   console.log(err);
    // });
  // }
  render() {
    const { loaded } = this.state;
    return <div>
      {
        !loaded
          ? <Loading />
          : <video />
      }
    </div>;
  }
}

FileViewerContentDynamic.propTypes = {
  shortPath: PropTypes.string
};

export default FileViewerContentDynamic;
