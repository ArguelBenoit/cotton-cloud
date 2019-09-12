import React from 'react';
import history from 'Utils/history';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { FiLogOut, FiCloud } from 'react-icons/fi';
import LiSideBar from 'Components/liSideBar';
import StoreInfo from 'Components/storeInfo';
import PropTypes from 'prop-types';
import 'Styles/sideBar.less';
import EventEmitter from 'Utils/eventEmitter';


const firstUl = [
  {
    route: null,
    name: 'Logout',
    icon: <FiLogOut />,
    action: () => destroyJwtCookie()
  }, {
    route: '/',
    name: 'Home /',
    icon: <FiCloud />,
    action: null
  }
];


class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: window.location.pathname,
      active: false
    };
  }
  componentDidMount() {
    history.listen( ({ pathname }) =>  {
      this.setState({
        location: pathname
      });
    });
    EventEmitter.subscribe('toggleMenu', () => {
      this.setState({ active: !this.state.active });
    });
  }
  render() {
    const { location, active } = this.state;
    const className = `sideBar ${active ? 'active' : ''}`;
    return <div className={className}>
      <div className="marginTop"/>
      <div className="main">
        <main>
          <ul>
            {firstUl.map(
              (e, i) => <LiSideBar key={'firstMenu' + i} location={location} {...e} />
            )}
          </ul>
        </main>
        <footer>
          <StoreInfo/>
        </footer>
      </div>
    </div>;
  }
}

SideBar.propTypes = {
  menuActive: PropTypes.bool
};

export default SideBar;
