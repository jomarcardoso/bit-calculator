Array.prototype.HALF_ADDER = function () {
  return [this.XOR(), this.AND()];
};

Array.prototype.ADDER = function () {
  const [a, b] = [this[0], this[1]].HALF_ADDER();
  const [c, d] = [a, this[2]].HALF_ADDER();

  return [c, [b, d].OR()];
};
