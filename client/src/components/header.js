import React from 'react';
import 'Styles/header.less';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EventEmitter from 'Utils/eventEmitter';
import { MdCloud } from 'react-icons/md';

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
    <Link to={'/'}>
      <h1>
        <span>
          <MdCloud />
        </span>
        &nbsp;
        CottonCloud
      </h1>
    </Link>
  </header>;
};

Header.propTypes = {
  noMenu: PropTypes.bool
};

export default Header;
