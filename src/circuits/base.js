Array.prototype.AND = function () {
  return Number(Boolean(this[0] && this[1]));
};

Array.prototype.OR = function () {
  return Number(Boolean(this[0] || this[1]));
};

Array.prototype.NAND = function () {
  return Number(!this.AND());
};

Array.prototype.XOR = function () {
  return Number(Boolean(this.OR() && this.NAND()));
};

Array.prototype.NOR = function () {
  return Number(!this.OR());
};

Array.prototype.XNOR = function () {
  return Number(!this.XOR());
};
