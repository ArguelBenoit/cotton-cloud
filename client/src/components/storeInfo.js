import React from 'react';
import 'Styles/storeInfo.less';

let StoreInfo = () => {
  let style = {
    width: '16px',
    height: '16px',
    borderRadius: '5px'
  };
  return <div className="storeInfo">
    <div className="u-flex-line">
      <div className="u-margin-right-five" style={{...style, background: '#ccc'}}/>
      <div>Available: {'983go'}</div>
    </div>
    <div className="u-flex-line">
      <div className="u-margin-right-five" style={{...style, background: '#32998a'}}/>
      <div>Your cloud: {'2go'}</div>
    </div>
    <div className="u-flex-line">
      <div className="u-margin-right-five" style={{...style, background: '#f90'}}/>
      <div>Something else: {'15go'}</div>
    </div>
    <div className="u-flex-line u-margin-top-five">
      <div className="container-bar u-margin-right-five" style={{background: '#ccc'}}>
        <div style={{width: '40%'}}/>
        <div style={{width: '15%'}}/>
      </div>
      <div>1to</div>
    </div>
  </div>;
};

export default StoreInfo;
