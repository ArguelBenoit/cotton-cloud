import React from 'react';
import 'Styles/toolBox.less';
import PropTypes from 'prop-types';

let ToolBox = props => {
  return <div className="toolBox" />;
};

ToolBox.propTypes = {
  smallScreen: PropTypes.bool,
  clickMenu: PropTypes.func
};

export default ToolBox;
