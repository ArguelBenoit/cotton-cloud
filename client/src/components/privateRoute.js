import React from 'react';
import { Route } from 'react-router-dom';
import history from 'Utils/history';
import PropTypes from 'prop-types';
import request from 'Utils/request';


class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loged: false
    };
  }
  componentDidMount() {
    request('get', '/user/ping')
      .then(() => {
        this.setState({loged: true});
      }).catch(() => {
        this.setState({loged: false});
        history.push('/login');
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      request('get', '/user/ping')
        .then()
        .catch(() => {
          history.push('/login');
        });
    }
  }
  render() {
    const {
      component: Component,
      ...rest
    } = this.props;
    const { loged } = this.state;
    if (loged) {
      return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
      return <div
        ref="container"
        className="container-page"
      />;
    }
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string
};

export default PrivateRoute;
