export function convertArrayToString(a = []) {
  return a.join('');
}

Array.prototype.has = function (binary = []) {
  return this.map(convertArrayToString).includes(convertArrayToString(binary));
};

Array.prototype.is = function (binary = []) {
  return convertArrayToString(this) === convertArrayToString(binary);
};
