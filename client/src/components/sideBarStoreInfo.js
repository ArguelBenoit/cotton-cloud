import React from 'react';
import request from 'Utils/request';

class SideBarStoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: window.location.pathname,
      active: false
    };
  }
  componentDidMount() {
    request('get', '/disk').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    let style = {
      width: '16px',
      height: '16px',
      borderRadius: '4px'
    };
    return <div className="storeInfo">
      <div className="u-flex-line">
        <div className="u-margin-right-teen" style={{...style, background: '#444'}}/>
        <div>Available: {'983go'}</div>
      </div>
      <div className="u-flex-line">
        <div className="u-margin-right-teen" style={{...style, background: '#32998a'}}/>
        <div>Your cloud: {'2go'}</div>
      </div>
      <div className="u-flex-line">
        <div className="u-margin-right-teen" style={{...style, background: '#f90'}}/>
        <div>Something else: {'15go'}</div>
      </div>
      <div className="u-flex-line u-margin-top-five">
        <div className="container-bar u-margin-right-five" style={{background: '#444'}}>
          <div style={{width: '40%'}}/>
          <div style={{width: '15%'}}/>
        </div>
        <div>1to</div>
      </div>
    </div>;
  }
}

export default SideBarStoreInfo;
