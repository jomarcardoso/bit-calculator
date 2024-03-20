Array.prototype.INVERTER = function () {
  return this.map((bit) => [bit, 1].XOR());
};

Array.prototype.RCA = function (toSum = [], subtract = false) {
  const initial = this.map(() => 0);
  let carry = subtract ? toSum[toSum.length - 1] : 0;
  const invertedToSum = subtract ? toSum.INVERTER() : [...toSum];
  const self = [...this];

  const sum = self.reduceRight((acc, number, index) => {
    const copyAcc = [...acc];
    const [sum, newCarry] = [number, invertedToSum[index], carry].ADDER();

    copyAcc[index] = sum;
    carry = newCarry;

    return copyAcc;
  }, initial);

  if (carry) {
    return [carry, ...sum];
  }

  return sum;
};
