import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import 'Styles/main.less';
import history from 'Utils/history';
import Header from 'Components/header';
import SideBar from 'Components/sideBar';
import Viewer from 'Components/viewer';
import Login from 'Pages/login';
import Files from 'Pages/files';
import Error from 'Pages/error';

import { getJwtCookie } from 'Utils/jwtCookie';

class App extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return <Router history={history}>
      {!getJwtCookie() ?
        <div>
          <Header noMenu />
          <div className="container container-login-page" style={{paddingTop: '100px'}}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
        :
        <div>
          <Header />
          <SideBar />
          <Viewer />
          <div className="container" style={{paddingTop: '100px', paddingBottom: '30px'}}>
            <Switch>
              <Route path="/" exact component={Files} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      }
    </Router>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
