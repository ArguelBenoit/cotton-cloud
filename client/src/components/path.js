import React from 'react';
import parseQuery from 'Utils/parseQuery';
import { FaFolderOpen } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventEmitter from 'Utils/eventEmitter';


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

let Path = props => {
  let path = createPathArray();
  if (props.viewer) {
    return <div className={'u-flex-line path' + ''}>
        <FiArrowLeft onClick={() => EventEmitter.dispatch('viewFile', {active: false, index: null})} />
        {props.name}&nbsp;in&nbsp;/
        {path.map(
          (p, i) => {
            return <span key={i}>&nbsp;{p}&nbsp;/</span>;
          }
        )}
    </div>;
  }
  return <div className={'u-flex-line path' + ''}>
    <FaFolderOpen className="first-icon" />
    <Link to={'/'}>
      <span>/</span>
    </Link>
    {path.map(
      (p, i) => {
        return <span>
          <Link to={createPath(path, i)} key={i}>
            <span>{p}</span>
          </Link>
          &nbsp;/&nbsp;
        </span>;
      }
    )}
  </div>;
};

Path.propTypes = {
  viewer: PropTypes.bool,
  name: PropTypes.string
};

export default Path;
