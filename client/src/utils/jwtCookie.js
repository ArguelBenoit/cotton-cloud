const jwtCookieName = 'cottonCloudJwt';


let setJwtCookie = jwt => {
  document.cookie = `${jwtCookieName}=${jwt};`;
  setTimeout(() => window.location.href = '/', 100);
};

let destroyJwtCookie = () => {
  document.cookie = `${jwtCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  setTimeout(() => window.location.href = '/', 100);
};

let getJwtCookie = () => {
  const name = `${jwtCookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};


export {
  setJwtCookie,
  destroyJwtCookie,
  getJwtCookie
};
