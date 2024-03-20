window.T_FLIP_FLOP = () => {
  let carry = 0;

  function run(toSet = 0, toReset = 0, finish = false) {
    const a = [toSet, carry].NOR();
    const b = [toReset, a].NOR();

    carry = b;

    if (!finish) {
      return run(toSet, toReset, true);
    }

    return b;
  }

  return run;
};

window.FLIP_FLOP = () => {
  const tFlipFlop = T_FLIP_FLOP();

  function run(info = 0, toSet = 0) {
    const a = [info, toSet].AND();
    const b = [NOT(info), toSet].AND();

    return tFlipFlop(a, b);
  }

  return run;
};
