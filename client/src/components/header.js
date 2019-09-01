import React from 'react';
import 'Styles/header.less';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EventEmitter from 'Utils/eventEmitter';

let Header = props => {
  const { noMenu } = props;
  return <header className="mainHeader">
    {noMenu ? '' :
      <div
        className="button-menu"
        onClick={() => EventEmitter.dispatch('toggleMenu')}
      >
        <div />
        <div />
        <div />
      </div>
    }
    <h1>
      <Link to={'/'}>
        CottonCloud
      </Link>
    </h1>
  </header>;
};

Header.propTypes = {
  noMenu: PropTypes.bool
};

export default Header;
