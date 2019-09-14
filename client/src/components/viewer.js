import React from 'react';
import history from 'Utils/history';
// import PropTypes from 'prop-types';
// import { destroyJwtCookie } from 'Utils/jwtCookie';
// import { FaHome, FaSkull } from 'react-icons/fa';
// import 'Styles/viewer.less';
import EventEmitter from 'Utils/eventEmitter';



class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // history.listen( ({ pathname }) =>  {
    //   this.setState({});
    // });
    // EventEmitter.subscribe('toggleMenu', () => {
    //   this.setState({ active: !this.state.active });
    // });
  }
  render() {
    return <div className="viewer" />;
  }
}

// Viewer.propTypes = {
//   active: PropTypes.bool
// };

export default Viewer;
