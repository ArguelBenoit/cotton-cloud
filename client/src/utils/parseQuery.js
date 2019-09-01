
export default (search) => {
  var str = search;
  var objURL = {};
  str.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    function( $0, $1, $2, $3 ){
      objURL[ $1 ] = $3;
    }
  );
  return objURL;
};
