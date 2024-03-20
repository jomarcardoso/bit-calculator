/**
 * the last bit define if set or not in memory
 *
 * @example
 * ```js
 * const memory = MEMORY();
 *
 * memory(1, 1, 1, 1, 0)
 * // [0, 0, 0, 0]
 *
 * memory(1, 1, 1, 1, 1)
 * // [1, 1, 1, 1]
 *
 * memory(1, 1, 1, 1, 0)
 * // [1, 1, 1, 1]
 * ```
 */
window.MEMORY = () => {
  let flipFlops = [];
  let allocate = true;

  function run(bits = [], toSet) {
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

/**
 * generated with GPT chat
 *
 * integrated memory controller
 * receive a combination and return the RAM address
 *
 * @example
 * ```js
 * IMC([1, 1])
 * // [0, 1, 0, 0]
 *
 * @param {*} inputs
 * ```
 */
window.IMC = (inputs = []) => {
  const clauses = [];

  for (let i = 0; i < Math.pow(2, inputs.length); i++) {
    const clause = [];
    for (let j = 0; j < inputs.length; j++) {
      clause.push((i >> j) % 2 === 0 ? inputs[j] : NOT(inputs[j]));
    }
    clauses.push(clause.AND());
  }

  return clauses;
};

/**
 *
 *
 */
window.RAM = () => {
  let memories = [];
  let allocate = true;

  function write(address = [], data = []) {
    if (allocate) {
      allocate = false;
      memories = IMC(address).map(() => MEMORY());
    }

    return IMC(address).map((output, index) => {
      return memories[index](data, output);
    });
  }

  function read(address = []) {
    const index = IMC(address).indexOf(1);

    if (allocate) {
      allocate = false;
      memories = IMC(address).map(() => MEMORY());
    }

    return memories[index]();
  }

  function show() {
    return memories.map((a) => a());
  }

  return {
    write,
    read,
    show,
  };
};

// integrated memory controller
// inprove this to make it versatile
// window.IMC = (inputs = []) => {
//   const [a, b, c, d] = inputs;

//   return [
//     [NOT(a), NOT(b), NOT(c), NOT(d)].AND(),
//     [a, NOT(b), NOT(c), NOT(d)].AND(),
//     [NOT(a), b, NOT(c), NOT(d)].AND(),
//     [NOT(a), NOT(b), c, NOT(d)].AND(),
//     [NOT(a), NOT(b), NOT(c), d].AND(),
//     [a, b, NOT(c), NOT(d)].AND(),
//     [a, NOT(b), c, NOT(d)].AND(),
//     [a, NOT(b), NOT(c), d].AND(),
//     [NOT(a), b, c, NOT(d)].AND(),
//     [NOT(a), b, NOT(c), d].AND(),
//     [NOT(a), NOT(b), c, d].AND(),
//     [a, b, c, NOT(d)].AND(),
//     [a, b, NOT(c), d].AND(),
//     [a, NOT(b), c, d].AND(),
//     [NOT(a), b, c, d].AND(),
//     [a, b, c, d].AND(),
//   ];
// };
