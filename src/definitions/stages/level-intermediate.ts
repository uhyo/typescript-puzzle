import { holeFactories as f } from "~/stages/holes";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

const stages: StageDefinition[] = [
  {
    id: "uh.v1.l20.s1",
    author: "uhyo",
    question: question`
        const value: ${blank} = Math.random() < 0.5
          ? "foobar"
          : 123;
    `,
    options: [
      f.primitive({ value: "string" }),
      f.primitive({ value: "number" }),
      f.primitive({ value: "boolean" }),
      f.union({ size: 2 }),
    ],
  },
];

export default stages;
