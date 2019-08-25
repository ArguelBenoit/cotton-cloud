import React from 'react';
import ReactDOM from 'react-dom';
import request from 'Utils/request';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { setJwtCookie } from 'Utils/jwtCookie';
import 'Styles/login.less';

const placeholder = {
  init : {
    login: 'Username',
    password: 'Password'
  },
  error: {
    login: 'Incorrect username',
    password: 'Or incorrect password'
  }
};

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleBorderError = this.toggleBorderError.bind(this);
    this.globalErrorHandler = this.globalErrorHandler.bind(this);
    this.state = {
      login: '',
      password: '',
      showPassword: false,
      placeholderLogin: placeholder.init.login,
      placeholderPassword: placeholder.init.password
    };
  }
  changeValue(event, name) {
    let { value } = event.target;
    this.setState({
      [name]: value
    });
    this.toggleBorderError(name, false);
    switch (name) {
      case 'login':
        this.setState({placeholderLogin: placeholder.init.login});
        break;
      case 'password':
        this.setState({placeholderPassword: placeholder.init.password});
        break;
      default:
    }
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
    this.toggleBorderError('login', true);
    this.toggleBorderError('password', true);
    this.refs['login'].value = '';
    this.refs['password'].value = '';
    this.setState({
      login: '',
      password: '',
      placeholderLogin: placeholder.error.login,
      placeholderPassword: placeholder.error.password
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { login, password } = this.state;
    let postObj = {
      ['username']: login,
      password
    };
    request('post', '/api/users/authenticate', postObj)
      .then(res => {
        setJwtCookie(res.data.id_token, '/dashboard');
      })
      .catch(err => {
        if (err.response && err.response.data.message === 'Incorrect username!') {
          this.globalErrorHandler();
        }
        if (
          err.response &&
          err.response.data.validation &&
          err.response.data.validation.keys
        ) {
          err.response.data.validation.keys.forEach(key => {
            switch (key) {
              case 'username':
                this.toggleBorderError('login', true);
                break;
              case 'password':
                this.toggleBorderError('password', true);
                break;
              default:
            }
          });
        }
      });
  }
  render() {
    const {
      showPassword,
      login,
      password,
      placeholderLogin,
      placeholderPassword
    } = this.state;
    return <div className="login u-max-width-l">
      <h1>Login</h1>
      <p>
        For security reasons but also for simplicity in development, you can not create an account and you can not change your connection information directly on the client. However, account management tools are present in the API's npm commands, for this, observe the script commands declared in the package.json file of the API directory of your cotton-cloud installation.
      </p>
      <form className="u-max-width-m" onSubmit={this.handleSubmit}>
        <input
          ref="login"
          value={login}
          type="text"
          className="u-full-width"
          placeholder={placeholderLogin}
          onChange={e => this.changeValue(e, 'login')}
        />
        <input
          ref="password"
          value={password}
          className="u-full-width"
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholderPassword}
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
