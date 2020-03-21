import { typeOption, unionOption } from "../../stages/holes/holeDefs";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

const stages: StageDefinition[] = [
  {
    id: "v1.l2.s1",
    question: question`
        const value: ${blank} = Math.random() < 0.5
          ? "foobar"
          : 123;
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
      unionOption(2),
    ],
  },
];

export default stages;
