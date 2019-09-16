import React from 'react';
import Path from 'Components/path';
// import PropTypes from 'prop-types';
// import 'Styles/viewer.less';
import { FiArrowLeft } from 'react-icons/fi';


class FileViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // history.listen( ({ pathname }) =>  {
    //   this.setState({});
    // });
    // EventEmitter.subscribe('toggleMenu', () => {
    //   this.setState({ active: !this.state.active });
    // });
  }
  render() {
    return <div className="filePage">
      <header className="u-flex-line">
        <Path viewer={true} name={'popo'}/>
      </header>
      <div />
    </div>;
  }
}

// Viewer.propTypes = {
//   active: PropTypes.bool
// };

export default FileViewer;
