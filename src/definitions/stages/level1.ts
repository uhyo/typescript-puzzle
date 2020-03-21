import { typeOption } from "../../stages/holes/holeDefs";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

const stages: StageDefinition[] = [
  {
    id: "v1.l1.s1",
    question: question`
        const value: ${blank} = "foobar";
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
    ],
  },
  {
    id: "v1.l1.s2",
    question: question`
        const num: ${blank} = 3.1415;
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
    ],
  },
];

export default stages;
