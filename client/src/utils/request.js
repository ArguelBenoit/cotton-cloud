import axios from 'axios';
import { getJwtCookie } from 'Utils/jwtCookie';
const apiUrl = 'http://localhost:81';


export default (type, route, data = {}) => {
  axios
    .defaults
    .headers
    .common['Authorization'] = `${getJwtCookie()}`;
  return axios[type](`${apiUrl}${route}`, data);
};


/********** example: ***********/

// request('GET', '/api/ping', {})
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   });
