import { FLIP_FLOP } from './flip-flop.js';

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
function MEMORY() {
  let flipFlops = [];
  let allocate = true;

  function run(bits = [], toSet = 0) {
    if (allocate) {
      flipFlops = bits.map(() => FLIP_FLOP());
      allocate = false;
    }

    return flipFlops.map((flipFlop, index) => {
      return flipFlop(bits[index] || 0, toSet);
    });
  }

  return run;
}

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
function IMC(inputs = []) {
  const clauses = [];

  for (let i = 0; i < Math.pow(2, inputs.length); i++) {
    const clause = [];
    for (let j = 0; j < inputs.length; j++) {
      clause.push((i >> j) % 2 === 0 ? inputs[j] : NOT(inputs[j]));
    }
    clauses.push(clause.AND());
  }

  return clauses;
}

/**
 * RAM().write(address, data)
 * RAM().write([0, 1], [0, 1, 1, 0])
 */
export function RAM(addressShape = [0, 0, 0, 0], defaultValue = [0, 0, 0, 0]) {
  let memories = IMC(addressShape).map(() => MEMORY());

  memories.forEach((memory) => {
    memory(defaultValue, 1);
  });

  function write(address = [], data = []) {
    return IMC(address).map((output, index) => {
      return memories[index](data, output);
    });
  }

  function read(address = []) {
    const index = IMC(address).indexOf(1);

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
}

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
