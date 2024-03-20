# Bit Calculator 01 + 01 = 10

https://www.youtube.com/watch?v=BbnDmeNojFA

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

## Example

```html
<fieldset id="a">
  <legend>group A</legend>

  <label>
    <input type="checkbox" name="0" />
  </label>

  <label>
    <input type="checkbox" name="1" />
  </label>

  <label>
    <input type="checkbox" name="2" />
  </label>

  <label>
    <input type="checkbox" name="3" />
  </label>
</fieldset>

<fieldset id="b">
  <legend>group B</legend>

  <label>
    <input type="checkbox" name="0" />
  </label>

  <label>
    <input type="checkbox" name="1" />
  </label>

  <label>
    <input type="checkbox" name="2" />
  </label>

  <label>
    <input type="checkbox" name="3" />
  </label>

  <label>
    <input type="checkbox" name="4" />
  </label>
</fieldset>

<fieldset id="r">
  <legend>result</legend>

  <label>
    <input type="checkbox" name="0" />
  </label>

  <label>
    <input type="checkbox" name="1" />
  </label>

  <label>
    <input type="checkbox" name="2" />
  </label>

  <label>
    <input type="checkbox" name="3" />
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
