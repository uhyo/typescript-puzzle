import { holeFactories as f } from "~/stages/holes";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

const primitiveOptions = [
  f.primitive({ value: "string" }),
  f.primitive({ value: "number" }),
  f.primitive({ value: "boolean" }),
  f.primitive({ value: "void" }),
  f.arrayType({}),
];

const stages: StageDefinition[] = [
  {
    id: "uh.v1.l11.s1",
    author: "uhyo",
    question: question`
      const vars: ${blank} = [
        "foo", "bar", "baz"
      ];
    `,
    options: primitiveOptions,
  },
];

export default stages;
