import { typeOption } from "../../stages/holes/holeDefs";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

// options with primitive types only
const primitiveOptions = [
  typeOption("string"),
  typeOption("number"),
  typeOption("boolean"),
];

// options with literal values only
const literalOptions = [
  typeOption("string"),
  typeOption("number"),
  typeOption("boolean"),
];

const stages: StageDefinition[] = [
  {
    id: "uh.v1.l1.s1",
    author: "uhyo",
    question: question`
        const value: ${blank} = "foobar";
    `,
    options: primitiveOptions,
  },
  {
    id: "uh.v1.l1.s2",
    author: "uhyo",
    question: question`
        const num: ${blank} = 3.1415;
    `,
    options: primitiveOptions,
  },
  {
    id: "uh.v1.l1.s3",
    author: "uhyo",
    question: question`
        const b: ${blank} = true;
    `,
    options: primitiveOptions,
  },
];

export default stages;
