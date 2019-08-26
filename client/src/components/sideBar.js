import React from 'react';
import history from 'Utils/history';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { IoMdLogOut, IoMdLogIn } from 'react-icons/io';
import { MdHome } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import LiSideBar from 'Components/liSideBar';
import StoreInfo from 'Components/storeInfo';
import PropTypes from 'prop-types';
import 'Styles/sideBar.less';


const firstUl = [
  {
   route: null,
   name: 'Logout',
   icon: <IoMdLogOut />,
   action: () => destroyJwtCookie('/'),
   color: null
 }, {
    route: '/login',
    name: 'Login',
    icon: <IoMdLogIn />,
    action: null,
    color: null
  }, {
    route: '/',
    name: 'Home /',
    icon: <MdHome />,
    action: null,
    color: null
  }
];


class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: window.location.pathname
    };
  }
  componentDidMount() {
    history.listen( ({ pathname }) =>  {
      this.setState({
        location: pathname
      });
    });
  }
  render() {
    const { location } = this.state;
    const { menuActive } = this.props;
    const className = `sideBar ${menuActive ? 'menuActive' : ''}`;
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
          <div className="u-margin-bottom-five u-font-size-xl">What?</div>
          <div className="u-margin-bottom-five">
            CottonCloud is a cloud client for storing and reading personal files. It is very easy to use and its code is deliberately simple in order to offer a stable base that can be modified as desired.
          </div>
          <a className="u-font-size-l u-flex-line" href="https://github.com/ArguelBenoit/cotton-cloud" target="_blank">
            <GoMarkGithub/>&nbsp;CottonCloud on GitHub
          </a>
        </footer>
      </div>
    </div>;
  }
}

SideBar.propTypes = {
  menuActive: PropTypes.bool
};

export default SideBar;
