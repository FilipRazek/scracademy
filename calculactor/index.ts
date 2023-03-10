import { Actor } from "apify";
import { calculate, Operator } from "./calculate.js";

type InputType = { numbers: number[]; operator: Operator };

await Actor.init();

const { numbers, operator } = await Actor.getInput<InputType>();
const result = calculate(numbers, operator);

await Actor.pushData({ result });

await Actor.exit();
