import './circuits/index.js';
import './events.js';
import { decimalToBinary, binaryToDecimal } from './calcs.js';

const ram = RAM();

document.addEventListener('calckey', (event) => {
  const binary = decimalToBinary(event.target.value);

  console.log(binary);

  ram.write([1, 1, 1, 1], binary);

  log.insertAdjacentHTML('afterbegin', `<p>${binary}</p>`);

  result.value = binaryToDecimal(ram.read([1, 1, 1, 1]));
});

// screen memory address
// [1, 1, 1, 1]
// [0, 1, 1, 1]
// [1, 0, 1, 1]
// [0, 0, 1, 1]
// [1, 1, 0, 1]
// [0, 1, 0, 1]
// [1, 0, 0, 1]

// operator memory address
// [0, 0, 0, 1]

// calc memory address
// [1, 1, 1, 0]
// [0, 1, 1, 0]
// [1, 0, 1, 0]
// [1, 1, 0, 0]
// [0, 1, 0, 0]
// [1, 0, 0, 0]
// [0, 0, 0, 0]
