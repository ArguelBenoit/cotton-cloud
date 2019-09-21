import React from 'react';
import EventEmitter from 'Utils/eventEmitter';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';

class FileViewer extends React.Component {
  constructor(props) {
    super(props);
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
    let { files, index } = this.props;
    return <div className="fileViewer">
      <header className="u-flex-line">
        <IoIosClose className="navIcon" onClick={() => EventEmitter.dispatch('viewFile', {active: false, index: null})} />
        <div>
          {files[index].name}
        </div>
        <IconFile className="iconType" type={files[index].type} />
        <MdFileDownload className="navIcon" />
      </header>
      <div className="containerViewer">
        {
          index === 0 ?
            '' :
            <FaArrowLeft className="navIcon left" onClick={() => EventEmitter.dispatch('viewFile', {active: true, index: index-1})} />
        }
        <div className="center">
          <IconFile type={files[index].type} />
          <br/>
          {files[index].name}
        </div>
        {
          index === files.length - 1 ?
            '' :
            <FaArrowRight className="navIcon right" onClick={() => EventEmitter.dispatch('viewFile', {active: true, index: index+1})} />
        }
      </div>
    </div>;
  }
}

FileViewer.propTypes = {
  files: PropTypes.array,
  index: PropTypes.number
};

export default FileViewer;
