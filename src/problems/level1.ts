import { typeOption } from "./options";
import { problem } from "./problemDefinition";
import { typeHole } from "./problemDefinition/hole";
import { StageDefinition } from "./stageDefinition";

const stages: StageDefinition[] = [
  {
    id: "v1.l1.s1",
    problem: problem`
        const value: ${typeHole("string")} = "foobar";
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
    ],
  },
  {
    id: "v1.l1.s2",
    problem: problem`
        const num: ${typeHole("number")} = 3.1415;
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
    ],
  },
];

export default stages;
