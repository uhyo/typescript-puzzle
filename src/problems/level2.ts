import { typeOption } from "./options";
import { problem } from "./problemDefinition";
import { typeHole, unionHole } from "./problemDefinition/hole";
import { StageDefinition } from "./stageDefinition";

const stages: StageDefinition[] = [
  {
    id: "v1.l2.s1",
    problem: problem`
        const value: ${unionHole(
          typeHole("number"),
          typeHole("string"),
        )} = Math.random() < 0.5
          ? "foobar"
          : 123;
    `,
    options: [
      typeOption("string"),
      typeOption("number"),
      typeOption("boolean"),
    ],
  },
];

export default stages;
