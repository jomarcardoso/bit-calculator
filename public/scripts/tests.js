function expect(test, value = 0, toBe = 0) {
  if (JSON.stringify(value) !== JSON.stringify(toBe)) {
    console.log('fail: ', test, '\nexpected: ', toBe, '\nreceived: ', value);
  }
}

expect('AND 0 0 to be false', [0, 0].AND(), 0);
expect('AND 0 1 to be false', [0, 1].AND(), 0);
expect('AND 1 0 to be false', [1, 0].AND(), 0);
expect('AND 1 1 to be true', [1, 1].AND(), 1);

expect('OR 0 0 to be false', [0, 0].OR(), 0);
expect('OR 0 1 to be true', [0, 1].OR(), 1);
expect('OR 1 0 to be true', [1, 0].OR(), 1);
expect('OR 1 1 to be true', [1, 1].OR(), 1);

expect('NAND 0 0 to be true', [0, 0].NAND(), 1);
expect('NAND 0 1 to be true', [0, 1].NAND(), 1);
expect('NAND 1 0 to be true', [1, 0].NAND(), 1);
expect('NAND 1 1 to be false', [1, 1].NAND(), 0);

expect('XOR 0 0 to be false', [0, 0].XOR(), 0);
expect('XOR 0 1 to be true', [0, 1].XOR(), 1);
expect('XOR 1 0 to be true', [1, 0].XOR(), 1);
expect('XOR 1 1 to be false', [1, 1].XOR(), 0);

expect('NOR 0 0 to be true', [0, 0].NOR(), 1);
expect('NOR 0 1 to be false', [0, 1].NOR(), 0);
expect('NOR 1 0 to be false', [1, 0].NOR(), 0);
expect('NOR 1 1 to be false', [1, 1].NOR(), 0);

expect('XNOR 0 0 to be true', [0, 0].XNOR(), 1);
expect('XNOR 0 1 to be false', [0, 1].XNOR(), 0);
expect('XNOR 1 0 to be false', [1, 0].XNOR(), 0);
expect('XNOR 1 1 to be true', [1, 1].XNOR(), 1);

expect('HALF_ADDER 0 0 to be [0, 0]', [0, 0].HALF_ADDER(), [0, 0]);
expect('HALF_ADDER 0 1 to be [1, 0]', [0, 1].HALF_ADDER(), [1, 0]);
expect('HALF_ADDER 1 0 to be [1, 0]', [1, 0].HALF_ADDER(), [1, 0]);
expect('HALF_ADDER 1 1 to be [0, 1]', [1, 1].HALF_ADDER(), [0, 1]);

expect('ADDER 0 0 0 to be [0, 0]', [0, 0, 0].ADDER(), [0, 0]);
expect('ADDER 0 0 1 to be [1, 0]', [0, 0, 1].ADDER(), [1, 0]);
expect('ADDER 0 1 0 to be [1, 0]', [0, 1, 0].ADDER(), [1, 0]);
expect('ADDER 0 1 1 to be [0, 1]', [0, 1, 1].ADDER(), [0, 1]);
expect('ADDER 1 0 0 to be [1, 0]', [1, 0, 0].ADDER(), [1, 0]);
expect('ADDER 1 0 1 to be [0, 1]', [1, 0, 1].ADDER(), [0, 1]);
expect('ADDER 1 1 0 to be [0, 1]', [1, 1, 0].ADDER(), [0, 1]);
expect('ADDER 1 1 1 to be [1, 1]', [1, 1, 1].ADDER(), [1, 1]);

expect(
  'INVERTER 0 0 0 0 to be [0, 0, 0, 0]',
  [0, 0, 0, 0].INVERTER(),
  [1, 1, 1, 1],
);
expect(
  'INVERTER 1 1 0 0 to be [0, 0, 1, 1]',
  [1, 1, 0, 0].INVERTER(),
  [0, 0, 1, 1],
);

expect(
  'RCA(0000, 0000) to be [0, 0, 0, 0]',
  [0, 0, 0, 0].RCA([0, 0, 0, 0]),
  [0, 0, 0, 0],
);
expect(
  'RCA(1000, 0000) to be [1, 0, 0, 0]',
  [1, 0, 0, 0].RCA([0, 0, 0, 0]),
  [1, 0, 0, 0],
);
expect(
  'RCA(0000, 1000) to be [1, 0, 0, 0]',
  [0, 0, 0, 0].RCA([1, 0, 0, 0]),
  [1, 0, 0, 0],
);
expect(
  'RCA(1000, 1000) to be [0, 1, 0, 0]',
  [0, 1, 0, 0].RCA([0, 1, 0, 0]),
  [1, 0, 0, 0],
);
expect(
  'RCA(0100, 1000) to be [1, 1, 0, 0]',
  [0, 1, 0, 0].RCA([1, 0, 0, 0]),
  [1, 1, 0, 0],
);
expect('1 + 5 to be 6', [0, 0, 0, 1].RCA([0, 1, 0, 1]), [0, 1, 1, 0]);
expect(
  'RCA(0100, 0100) to be [0, 0, 1, 0]',
  [0, 1, 0, 0].RCA([0, 1, 0, 0]),
  [1, 0, 0, 0],
);
