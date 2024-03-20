// generated with GPT Chat
export function binaryToDecimal(binary) {
  let decimal = 0;
  for (let i = 0; i < binary.length; i++) {
    const digit = parseInt(binary[binary.length - 1 - i]);
    decimal += digit * Math.pow(2, i);
  }
  return decimal;
}

// generated with GPT Chat
export function decimalToBinary(decimal) {
  let binary = '';
  while (decimal > 0) {
    binary = (decimal % 2) + binary;
    decimal = Math.floor(decimal / 2);
  }

  return binary === ''
    ? [0, 0, 0, 0]
    : binary
        .padStart(4, '0')
        .split('')
        .map((a) => Number(a));
}
