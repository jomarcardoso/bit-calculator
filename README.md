# Bit Calculator 01 + 01 = 10

## The logical operators

```js
Array.prototype.AND = function () {
  return Number(Boolean(this[0] && this[1]));
};

Array.prototype.OR = function () {
  return Number(Boolean(this[0] || this[1]));
};

Array.prototype.NAND = function () {
  return Number(!this.AND());
};

Array.prototype.XOR = function () {
  return Number(Boolean(this.OR() && this.NAND()));
};

Array.prototype.NOR = function () {
  return Number(!this.OR());
};

Array.prototype.XNOR = function () {
  return Number(!this.XOR());
};
```

## The adders

```js
Array.prototype.HALF_ADDER = function () {
  return [this.XOR(), this.AND()];
};

Array.prototype.ADDER = function () {
  const [a, b] = this.HALF_ADDER();
  const [c, d] = [a, this[2]].HALF_ADDER();

  return [c, [b, d].OR()];
};
```

## Ripple-carry adder

```js
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
```

## Unit tests

```js
function expect(test, value = 0, toBe = 0) {
  if (JSON.stringify(value) !== JSON.stringify(toBe)) {
    console.log('fail: ', test, '\nreceived: ', value, 'expected: ', toBe);
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
  'INVERTER 0 0 0 0 0 to be [0, 0, 0, 0]',
  [0, 0, 0, 0, 0].INVERTER(),
  [0, 0, 0, 0],
);
expect(
  'INVERTER 0 0 0 0 1 to be [0, 0, 0, 0]',
  [0, 0, 0, 0, 1].INVERTER(),
  [1, 1, 1, 1],
);
expect(
  'INVERTER 1 1 0 0 0 to be [1, 1, 0, 0]',
  [1, 1, 0, 0, 0].INVERTER(),
  [1, 1, 0, 0],
);
expect(
  'INVERTER 1 1 0 0 1 to be [0, 0, 1, 1]',
  [1, 1, 0, 0, 1].INVERTER(),
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
  [1, 0, 0, 0].RCA([1, 0, 0, 0]),
  [0, 1, 0, 0],
);
expect(
  'RCA(0100, 1000) to be [1, 1, 0, 0]',
  [0, 1, 0, 0].RCA([1, 0, 0, 0]),
  [1, 1, 0, 0],
);
expect(
  'RCA(1000, 0100) to be [1, 1, 0, 0]',
  [1, 0, 0, 0].RCA([0, 1, 0, 0]),
  [1, 1, 0, 0],
);
expect(
  'RCA(0100, 0100) to be [0, 0, 1, 0]',
  [0, 1, 0, 0].RCA([0, 1, 0, 0]),
  [0, 0, 1, 0],
);
```

## Example

```html
<fieldset id="a">
  <legend>group A</legend>

  <label>
    <input type="checkbox" name="0">
  </label>
  
  <label>
    <input type="checkbox" name="1">
  </label>
  
  <label>
    <input type="checkbox" name="2">
  </label>
  
  <label>
    <input type="checkbox" name="3">
  </label> 
</fieldset>

<fieldset id="b">
  <legend>group B</legend>

  <label>
    <input type="checkbox" name="0">
  </label>
  
  <label>
    <input type="checkbox" name="1">
  </label>
  
  <label>
    <input type="checkbox" name="2">
  </label>
  
  <label>
    <input type="checkbox" name="3">
  </label> 
  
  <label>
    <input type="checkbox" name="4">
  </label> 
</fieldset>

<fieldset id="r">
  <legend>result</legend>

  <label>
    <input type="checkbox" name="0">
  </label>
  
  <label>
    <input type="checkbox" name="1">
  </label>
  
  <label>
    <input type="checkbox" name="2">
  </label>
  
  <label>
    <input type="checkbox" name="3">
  </label> 
</fieldset>
```

```js
import { fromEvent, scan, pipe, merge, map } from 'rxjs';

const transformIntoInput = pipe(
  scan(
    (acc, event) => {
      const copyAcc = [...acc];

      copyAcc[Number(event.target.name)] = Number(event.target.checked);

      return copyAcc;
    },
    [0, 0, 0, 0],
  ),
);

const aInput = fromEvent(document.querySelectorAll('#a input'), 'change').pipe(
  transformIntoInput,
  map((a) => ({ a })),
);

const bInput = fromEvent(document.querySelectorAll('#b input'), 'change').pipe(
  transformIntoInput,
  map((b) => ({ b })),
);

const inputs = merge(aInput, bInput).pipe(
  scan(
    (acc, event) => {
      const copyAcc = [[...acc[0]], [...acc[1]]];

      if (event.a) {
        copyAcc[0] = event.a;
      }

      if (event.b) {
        copyAcc[1] = event.b;
      }

      return copyAcc;
    },
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ),
);

const fourBitsCalculator = inputs.pipe(
  map((inputs) => {
    const [groupA, groupB] = inputs;

    return groupA.RCA(groupB);
  }),
);

const outputs = Array.from(document.querySelectorAll('#r input'));

fourBitsCalculator.subscribe((result) => {
  outputs[0].checked = !!result[0];
  outputs[1].checked = !!result[1];
  outputs[2].checked = !!result[2];
  outputs[3].checked = !!result[3];
});
```
