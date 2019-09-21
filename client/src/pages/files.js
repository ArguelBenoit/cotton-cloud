import React from 'react';
import request from 'Utils/request';
import parseQuery from 'Utils/parseQuery';
import sortAlphaNum from 'Utils/sortAlphaNum';
import FileList from 'Components/fileList';
import FileViewer from 'Components/fileViewer';
import history from 'Utils/history';
import 'Styles/files.less';
import EventEmitter from 'Utils/eventEmitter';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.requestFiles = this.requestFiles.bind(this);
    this.sortFiles = this.sortFiles.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.state = {
      files: [],
      filesSorted: [],
      sort: 'type',
      last: 0,
      viewerActive: false,
      viewerIndex: null
    };
  }
  componentDidMount() {
    let path = parseQuery(window.location.search).path || '';
    this.requestFiles(path);
    history.listen( loc =>  {
      let path = parseQuery(loc.search).path || '';
      this.requestFiles(path);
    });
    EventEmitter.subscribe('sortFile', type => {
      this.sortFiles(type);
    });
    EventEmitter.subscribe('selectFile', obj => {
      this.selectFile(obj.index, obj.option);
    });
    EventEmitter.subscribe('viewFile', data => {
      this.viewFile(data.active, data.index);
    });
  }
  requestFiles(path) {
    request('get', `/files?path=${path}`).then(res => {
      let files = res.data;
      this.setState({ files });
      this.sortFiles(this.state.sort);
    }).catch(err => {
      console.log(err);
    });
  }
  selectFile(index, event) {
    let { filesSorted, last } = this.state;
    if (event.shiftKey) {
      if(last < index) {
        for (let i = last; i <= index; i++) {
          filesSorted[i].selected = true;
        }
      } else {
        for (let i = last; i >= index; i--) {
          filesSorted[i].selected = true;
        }
      }
    } else if (event.ctrlKey || event.metaKey) {
      filesSorted[index].selected = !filesSorted[index].selected;
    } else {
      filesSorted.forEach((e, i) => {
        if(i === index)
          filesSorted[index].selected = !filesSorted[index].selected;
        else
          e.selected = false;
      });
    }
    filesSorted[index].selected ? last = index : '';
    this.setState({ filesSorted, last });
  }
  viewFile(active, index) {
    this.setState({
      viewerActive: active,
      viewerIndex: index
    });
  }
  sortFiles(type) {
    let { files } = this.state;
    let sorted;
    let sort;

    if (type === 'type') {
      let diffType = {};
      sorted = [];
      sort = 'type';
      files.forEach(e => {
        if (diffType[e.type])
          diffType[e.type].push(e);
        else
          diffType[e.type] = [e];
      });
      if(diffType.directory) {
        sorted.push(...diffType.directory);
      }
      Object.keys(diffType).forEach(type => {
        if(type !== 'directory')
          sorted.push(...diffType[type]);
      });

    } else if (type === 'alpha') {
      sort = 'alpha';
      sorted = files.sort((a, b) => sortAlphaNum(a.name, b.name));

    } else {
      sort = 'amount';
      sorted = files.sort((a, b) => {
        if (a.size < b.size) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    this.setState({ filesSorted: sorted, sort });
  }
  render() {
    const { filesSorted, sort, viewerActive, viewerIndex } = this.state;
    if (viewerActive) {
      return <div className="filePage">
        <FileViewer files={filesSorted} index={viewerIndex} />
      </div>;
    } else {
      const fileListProps = {
        filesSorted,
        sort
      };
      return <div className="filePage">
        <FileList {...fileListProps} />
      </div>;
    }
  }
}
