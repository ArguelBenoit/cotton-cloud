import React from 'react';
import history from 'Utils/history';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { FaHome, FaSkull } from 'react-icons/fa';
import SideBarItem from 'Components/sideBarItem';
import SideBarStoreInfo from 'Components/sideBarStoreInfo';
import PropTypes from 'prop-types';
import 'Styles/sideBar.less';
import EventEmitter from 'Utils/eventEmitter';

const firstUl = [
  {
    route: null,
    name: 'Logout',
    icon: <FaSkull />,
    action: () => destroyJwtCookie()
  }, {
    route: '/',
    name: 'Home /',
    icon: <FaHome />,
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
              (e, i) => <SideBarItem key={'firstMenu' + i} location={location} {...e} />
            )}
          </ul>
        </main>
        <footer>
          <SideBarStoreInfo/>
        </footer>
      </div>
    </div>;
  }
}

SideBar.propTypes = {
  menuActive: PropTypes.bool
};

export default SideBar;
