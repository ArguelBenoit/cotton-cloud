
export default (nameA, nameB) => {
  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;
  let aA = nameA.replace(reA, '');
  let bA = nameB.replace(reA, '');
  if (aA === bA) {
    let aN = parseInt(nameA.replace(reN, ''), 10);
    let bN = parseInt(nameB.replace(reN, ''), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
};
