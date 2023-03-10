import { calculate } from "./calculate";

describe("calculate", () => {
  it("should multiply correctly", () => {
    const numbers = [1, 3, 7];
    expect(calculate(numbers, "*")).toBe(21);
  });

  it("should add correctly", () => {
    const numbers = [2, 4, 6];
    expect(calculate(numbers, "+")).toBe(12);
  });

  it("should exponentiate correctly", () => {
    // 3 ^ (4 ^ 2 ) = 43046721
    const numbers = [3, 4, 2];
    expect(calculate(numbers, "^")).toBe(43046721);
  });
});
