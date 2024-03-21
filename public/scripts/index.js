import './circuits/index.js';
import './tests.js';
import './events.js';
import './utils.js';
import { decimalToBinary, binaryToDecimal } from './calcs.js';
import { RAM } from './circuits/memory.js';

const ram = RAM();

log.innerHTML = ram.show().join('<br>');

const digits = [
  [0, 0, 0, 0], // 0
  [0, 0, 0, 1], // 1
  [0, 0, 1, 0], // 2
  [0, 0, 1, 1], // 3
  [0, 1, 0, 0], // 4
  [0, 1, 0, 1], // 5
  [0, 1, 1, 0], // 6
  [0, 1, 1, 1], // 7
  [1, 0, 0, 0], // 8
  [1, 0, 0, 1], // 9
];

const operators = [
  [1, 0, 1, 0], // +
  [1, 0, 1, 1], // -
];

const equals = [1, 1, 0, 0]; // =

const clear = [1, 1, 0, 1]; // C

const screenAddresses = [
  [1, 1, 1, 1], // 6
  [0, 1, 1, 1], // 5
  [1, 0, 1, 1], // 4
  [0, 0, 1, 1], // 3
  [1, 1, 0, 1], // 2
  [0, 1, 0, 1], // 1
  [1, 0, 0, 1], // 0
];

const operatorAddress = [0, 0, 0, 1];

const memoryAddresses = [
  [1, 1, 1, 0], // 6
  [0, 1, 1, 0], // 5
  [1, 0, 1, 0], // 4
  [1, 1, 0, 0], // 3
  [0, 1, 0, 0], // 2
  [1, 0, 0, 0], // 1
  [0, 0, 0, 0], // 0
];

function writeOnScreen() {
  const number = String(
    Number(
      screenAddresses
        .map((address) => {
          return binaryToDecimal(ram.read(address));
        })
        .join(''),
    ),
  );

  result.value = number;
}

function type(data = [0, 0, 0, 0]) {
  let carry = data;
  let mirrorScreen = [...screenAddresses].sort(() => -1);

  mirrorScreen.forEach((address) => {
    const current = ram.read(address);

    ram.write(address, carry);
    carry = current;
  });
}

function eraseScreen() {
  screenAddresses.forEach((address) => ram.write(address, [0, 0, 0, 0]));
}

function moveScreenToMemory() {
  memoryAddresses.forEach((address, index) => {
    const data = ram.read(screenAddresses[index]);

    ram.write(address, data);
  });

  eraseScreen();
}

function addOperator(operator = []) {
  ram.write(operatorAddress, operator);
  moveScreenToMemory();
}

function operate() {
  const numberOnScreen = decimalToBinary(
    Number(
      screenAddresses
        .map((address) => ram.read(address))
        .map(binaryToDecimal)
        .join(''),
    ),
  );

  const numberInMemory = decimalToBinary(
    Number(
      memoryAddresses
        .map((address) => ram.read(address))
        .map(binaryToDecimal)
        .join(''),
    ),
  );

  const sum = numberOnScreen.RCA(numberInMemory);

  eraseScreen();

  String(binaryToDecimal(sum))
    .split('')
    .forEach((digit) => {
      type(decimalToBinary(digit));
    });
}

document.addEventListener('calckey', (event) => {
  const binary = decimalToBinary(event.target.dataset.value);

  if (binary.is(clear)) {
    ram.reset();
  }

  if (binary.is(equals)) {
    operate();
  }

  if (digits.has(binary)) {
    type(binary);
  }

  if (operators.has(binary)) {
    addOperator(binary);
  }

  writeOnScreen();
  log.innerHTML = ram.show().join('<br>');

  // log.insertAdjacentHTML('afterbegin', `<p>${binary}</p>`);
});
