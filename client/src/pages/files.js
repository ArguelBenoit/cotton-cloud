import React from 'react';
import request from 'Utils/request';
import parseQuery from 'Utils/parseQuery';
import sortAlphaNum from 'Utils/sortAlphaNum';
import FileList from 'Components/fileList';
import FileViewer from 'Components/fileViewer';
import history from 'Utils/history';
import 'Styles/files.less';


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
      viewerPath: null,
      viewerName: null
    };
  }
  componentDidMount() {
    let path = parseQuery(window.location.search).path || '';
    this.requestFiles(path);
    history.listen( loc =>  {
      let path = parseQuery(loc.search).path || '';
      this.requestFiles(path);
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
      filesSorted.forEach(e => e.selected = false);
      filesSorted[index].selected = !filesSorted[index].selected;
    }
    filesSorted[index].selected ? last = index : '';
    this.setState({ filesSorted, last });
  }
  viewFile(active, path, name) {
    this.setState({
      viewerActive: active,
      viewerPath: path,
      viewerName: name
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
        if (diffType[e.type]) diffType[e.type].push(e);
        else diffType[e.type] = [e];
      });
      Object
        .keys(diffType)
        .sort((a, b) => sortAlphaNum(a, b))
        .sort(a => a === 'directory' ? -10000 : 0)
        .forEach( e => {
          diffType[e]
            .sort((a, b) => sortAlphaNum(a.name, b.name))
            .forEach(el => sorted.push(el));
        });

    } else if (type === 'alpha') {
      sort = 'alpha';
      sorted = files.sort((a, b) => sortAlphaNum(a.name, b.name));

    } else { // 'amount'
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
    const { filesSorted, sort, viewerActive } = this.state;
    if (viewerActive) {
      return <FileViewer />;
    } else {
      const fileListProps = {
        filesSorted,
        sort,
        sortFiles: type => this.sortFiles(type),
        selectFile: (index, option) => this.selectFile(index, option),
        viewFile: (active, path, name) => this.viewFile(active, path, name)
      };
      return <FileList {...fileListProps} />;
    }
  }
}
