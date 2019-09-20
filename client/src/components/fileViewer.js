import React from 'react';
import EventEmitter from 'Utils/eventEmitter';
import { FaArrowCircleLeft } from 'react-icons/fa';

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
        <div className={'u-flex-line path' + ''}>
          <FaArrowCircleLeft onClick={() => EventEmitter.dispatch('viewFile', {active: false, index: null})} />
          {this.props.name}
        </div>
      </header>
      <div />
    </div>;
  }
}

// Viewer.propTypes = {
//   active: PropTypes.bool
// };

export default FileViewer;
