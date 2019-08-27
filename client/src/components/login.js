import React from 'react';
import ReactDOM from 'react-dom';
import request from 'Utils/request';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { setJwtCookie } from 'Utils/jwtCookie';
import 'Styles/login.less';


export default class extends React.Component {
  constructor (props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleBorderError = this.toggleBorderError.bind(this);
    this.globalErrorHandler = this.globalErrorHandler.bind(this);
    this.state = {
      name: '',
      password: '',
      showPassword: false
    };
  }
  changeValue(event, type) {
    let { value } = event.target;
    this.setState({
      [type]: value
    });
    this.toggleBorderError(type, false);
  }
  toggleBorderError(ref, bool) {
    if (bool) {
      ReactDOM
        .findDOMNode(this.refs[ref])
        .classList
        .add('u-border-error');
    } else {
      ReactDOM
        .findDOMNode(this.refs[ref])
        .classList
        .remove('u-border-error');
    }
  }
  globalErrorHandler() {
    this.toggleBorderError('name', true);
    this.toggleBorderError('password', true);
    this.refs['name'].value = '';
    this.refs['password'].value = '';
    this.setState({
      name: '',
      password: ''
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    request('post', '/user/login', this.state, 'noCookie')
      .then(res => {
        setJwtCookie(res.data.token, '/');
      }).catch(() => {
        this.globalErrorHandler();
      });
  }
  render() {
    const {
      showPassword,
      name,
      password
    } = this.state;
    return <div className="login u-max-width-l">
      <h1>Login</h1>
      <p>
        For security reasons but also for simplicity in development, you can not create an account and you can not change your connection information directly on the client. However, account management tools are present in the API's npm commands, for this, observe the script commands declared in the package.json file of the API directory of your cotton-cloud installation.
      </p>
      <form className="u-max-width-m" onSubmit={this.handleSubmit}>
        <input
          ref="name"
          value={name}
          type="text"
          className="u-full-width"
          placeholder="Username"
          onChange={e => this.changeValue(e, 'name')}
        />
        <input
          ref="password"
          value={password}
          className="u-full-width"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={e => this.changeValue(e, 'password')}
        />
        {!showPassword ?
          <FaEyeSlash
            className="eye-icon"
            onClick={() => this.setState({showPassword: !showPassword})}
          /> :
          <FaEye
            className="eye-icon"
            onClick={() => this.setState({showPassword: !showPassword})}
          />
        }
        <input
          type="submit"
          value="Submit"
          className="button-primary u-full-width"
        />
      </form>
    </div>;
  }
}
