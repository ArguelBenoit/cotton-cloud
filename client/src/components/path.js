import React from 'react';
import parseQuery from 'Utils/parseQuery';
import { FaFolderOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';


let createPathArray = () => {
  let path = [];
  if(parseQuery(window.location.search).path) {
    path = parseQuery(window.location.search).path.split('/');
  }
  for(let i = 0; i < path.length; i++) {
    if ( path[i] === '') path.splice(i, 1);
  }
  if (path[0] === '') {
    path = [];
  }
  return path;
};

let createPath = (array, index) => {
  let str = '/?path=/';
  for(let i = 0; i <= index; i++) {
    str += `${array[i]}/`;
  }
  return str;
};

let Path = () => {
  let path = createPathArray();
  return <div className={'u-flex-line path' + ''}>
    <FaFolderOpen className="first-icon" />
    <Link to={'/'}>
      <span>/</span>
    </Link>
    {path.map(
      (p, i) => {
        return <span key={'pathSpan-' + i}>
          <Link to={createPath(path, i)}>
            <span>{p}</span>
          </Link>
          &nbsp;/&nbsp;
        </span>;
      }
    )}
  </div>;
};

export default Path;
