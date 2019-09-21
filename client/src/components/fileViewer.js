import React from 'react';
import EventEmitter from 'Utils/eventEmitter';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { /*MdFileDownload, */MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import IconFile from 'Components/iconFile';
import FileViewerContent from 'Components/fileViewerContent';

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
        <MdClose className="navIcon" onClick={() => EventEmitter.dispatch('viewFile', {active: false, index: null})} />
        <IconFile className="iconType" type={files[index].type} />
        {files[index].name}
      </header>
      <div className="containerViewer">
        <div className={'left ' + (index === 0 ? 'unActive' : '')}>
          <FaArrowLeft className="navIcon" onClick={() => EventEmitter.dispatch('viewFile', {active: true, index: index-1})} />
        </div>
        <div className="center">
          <FileViewerContent file={files[index]} />
        </div>
        <div className={'right ' + (index === files.length - 1 ? 'unActive' : '')}>
          <FaArrowRight className="navIcon" onClick={() => EventEmitter.dispatch('viewFile', {active: true, index: index+1})} />
        </div>
      </div>
    </div>;
  }
}

FileViewer.propTypes = {
  files: PropTypes.array,
  index: PropTypes.number
};

export default FileViewer;
