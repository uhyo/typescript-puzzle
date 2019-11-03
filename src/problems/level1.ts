import { typeOption } from "./options";
import { problem } from "./problemDefinition";
import { typeHole } from "./problemDefinition/hole";
import { StageDefinition } from "./stageDefinition";

const stages: StageDefinition[] = [
  {
    problem: problem`
        const value: ${typeHole("string")} = "foobar";
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
    ],
  },
];

export default stages;
