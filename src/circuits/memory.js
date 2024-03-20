// integrated memory controller
// inprove this to make it versatile
window.IMC = (inputs = []) => {
  const [a, b, c] = inputs;

  return [
    [NOT(a), NOT(b), NOT(c)].AND(),
    [a, NOT(b), NOT(c)].AND(),
    [NOT(a), b, NOT(c)].AND(),
    [NOT(a), NOT(b), c].AND(),
    [a, b, NOT(c)].AND(),
    [a, NOT(b), c].AND(),
    [NOT(a), b, c].AND(),
    [a, b, c].AND(),
  ];
};

window.ONE_BYTE_MEMORY = () => {
  let flipFlops = [];
  let allocate = true;

  // [...data, toSet]
  function run(data = []) {
    const bits = [...data];
    const toSet = bits.pop();

    if (allocate) {
      flipFlops = bits.map(() => FLIP_FLOP());
      allocate = false;
    }

    return flipFlops.map((flipFlop, index) => {
      return flipFlop(bits[index] || 0, toSet);
    });
  }

  return run;
};

window.MEMORY = () => {
  // [...data, toSet, ]
  function run() {}

  return run;
};
