Array.prototype.INVERTER = function () {
  const copyList = [...this];
  const invert = copyList.pop();

  return copyList.map((bit) => [bit, invert].XOR());
};

Array.prototype.RCA = function (toSum = []) {
  const initial = this.map(() => 0);
  let carry = toSum.length > initial.length ? toSum[toSum.length - 1] : 0;
  const invertedToSum =
    toSum.length > initial.length ? toSum.INVERTER() : [...toSum];

  console.log(toSum, initial, toSum.length > initial.lenght);

  return this.reduce((acc, number, index) => {
    const copyAcc = [...acc];
    const [sum, newCarry] = [number, invertedToSum[index], carry].ADDER();

    copyAcc[index] = sum;
    carry = newCarry;

    return copyAcc;
  }, initial);
};
