import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import 'Styles/main.less';
import 'Styles/containerPage.less';
import history from 'Utils/history';
import Header from 'Components/header';
import SideBar from 'Components/sideBar';

import PrivateRoute from 'Components/privateRoute';
import Login from 'Pages/login';
import Files from 'Pages/files';
import Error from 'Pages/error';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this);
    this.resize = this.resize.bind(this);
    this.closeSideBarByContainer = this.closeSideBarByContainer.bind(this);
    this.state = {
      menuActive: window.innerWidth > 800 ? true : false,
      smallScreen: window.innerWidth > 800 ? false : true || false,
      height: window.innerHeight,
      width: window.innerWidth
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize() {
    this.setState({
      menuActive: window.innerWidth > 800 ? true : false,
      smallScreen: window.innerWidth > 800 ? false : true,
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  clickMenu() {
    this.setState({menuActive: !this.state.menuActive});
  }
  closeSideBarByContainer() {
    const { menuActive, smallScreen } = this.state;
    if (smallScreen && menuActive) {
      this.clickMenu();
    }
  }
  render() {
    const { menuActive, smallScreen } = this.state;
    const classContainer = 'containerPage ' +
      (menuActive ? 'menuActive ' : '') +
      (smallScreen ? 'smallScreen ' : '') +
      (smallScreen && menuActive ? 'blured' : '');
    return <Router history={history} >
      <Header {...this.state} clickMenu={this.clickMenu} />
      <SideBar {...this.state} history={history}/>
      <div className={classContainer} onClick={this.closeSideBarByContainer}>
        <div className="container">
          <Switch>
            <PrivateRoute path="/" exact component={Files} />
            <Route path="/login" exact component={Login} />
            <Route component={Error} />
          </Switch>
        </div>
      </div>
    </Router>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
