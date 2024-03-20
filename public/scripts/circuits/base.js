window.NOT = (a = 0) => Number(!a);

Array.prototype.AND = function () {
  return Number(this.every((a) => !!a));
};

Array.prototype.OR = function () {
  return Number(this.some((a) => !!a));
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
