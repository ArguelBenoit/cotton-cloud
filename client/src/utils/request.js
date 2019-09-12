import axios from 'axios';
import { getJwtCookie } from 'Utils/jwtCookie';
const apiUrl = require('../../config.json')['apiUrl'];


export default (type, route, data = {}) => {
  axios
    .defaults
    .headers
    .common['authorization'] = `${getJwtCookie()}`;
  return axios[type](`${apiUrl}${route}`, data);
};


/********** example: ***********/

// request('GET', '/api/ping', {})
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   });
