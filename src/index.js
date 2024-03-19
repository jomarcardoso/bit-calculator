import './circuits';
import './events';
import { BinaryToAscii } from '@ilihub/binary-to-ascii';
import { AsciiToBinary } from '@codinasion/ascii-to-binary';

const number = '4';
const binary = AsciiToBinary(number);
const ascii = BinaryToAscii(binary);

document.addEventListener('calckey', (event) => {
  const binary = AsciiToBinary(event.target.value);

  log.insertAdjacentHTML('afterbegin', `<p>${binary}</p>`);
});
