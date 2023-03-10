type ReduceFn = (a: number, b: number) => number;

type ReduceParams = {
  fn: ReduceFn;
  initialValue: number;
};

const operationsMap = {
  "+": { fn: (a, b) => a + b, initialValue: 0 },
  "*": { fn: (a, b) => a * b, initialValue: 1 },
  "^": { fn: (a, b) => b ** a, initialValue: 1 },
} satisfies Record<string, ReduceParams>;

export type Operator = keyof typeof operationsMap;

export const calculate = (numbers: number[], operator: Operator) => {
  const { fn, initialValue } = operationsMap[operator];
  return numbers.reduceRight(fn, initialValue);
};
