import React from 'react';
import request from 'Utils/request';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { setJwtCookie } from 'Utils/jwtCookie';
import { GoMarkGithub } from 'react-icons/go';
import 'Styles/login.less';


export default class extends React.Component {
  constructor (props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }
  globalErrorHandler() {
    this.refs['name'].value = '';
    this.refs['password'].value = '';
    this.setState({
      name: '',
      password: ''
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    request('post', '/user/login', this.state)
      .then(res => {
        setJwtCookie(res.data.token);
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
    return <div className="container login u-max-width-m" style={{paddingTop: 100}}>
      <div className="row">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            ref="name"
            value={name}
            type="text"
            className="u-full-width"
            placeholder="Username"
            onChange={e => this.changeValue(e, 'name')}
          />
        <div className="containerPassword">
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
          </div>
          <input
            type="submit"
            value="Submit"
            className="button-primary"
            style={{marginBottom: 0}}
          />
        </form>
        <p className="u-margin-bottom-five">
          CottonCloud is a cloud client for storing and reading personal files. It is very easy to use and its code is deliberately simple in order to offer a stable base that can be modified as desired.
        </p>
        <a className="u-font-size-l u-flex-line u-margin-bottom-five" href="https://github.com/ArguelBenoit/cotton-cloud" target="_blank">
          <GoMarkGithub/>&nbsp;CottonCloud on GitHub
        </a>
      </div>
    </div>;
  }
}
