import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'Styles/liSideBar.less';

let LiSideBar = props => {
  const { route, icon, name, location, action } = props;
  if (!route) {
    return <a className="liSideBar" onClick={action}>
      <li className={`${location === route ? 'active' : ''}`}>
        {icon}
        <span>
          {name}
        </span>
      </li>
    </a>;
  }
  return <Link className="liSideBar" to={route}>
    <li className={`${location === route ? 'active' : ''}`}>
      {icon}
      <span>
        {name}
      </span>
    </li>
  </Link>;
};

LiSideBar.defaultProps = {
  location: ''
};

LiSideBar.propTypes = {
  route: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType(
        [
          PropTypes.string,
          PropTypes.element
        ]
      )
    )
  ]),
  icon: PropTypes.element,
  location: PropTypes.string,
  action: PropTypes.func
};

export default LiSideBar;
