import { holeFactories as f } from "~/stages/holes";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

const typeOptions = [
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
    options: typeOptions,
  },
  {
    id: "uh.v1.l11.s2",
    author: "uhyo",
    question: question`
      function isAllPositive(arr: ${blank}): ${blank} {
        return arr.every(v => v > 0);
      }
    `,
    options: typeOptions,
  },
  {
    id: "uh.v1.l11.s3",
    author: "uhyo",
    question: question`
      type User = {
        name: ${blank};
        age: ${blank};
      };

      const u: User = {
        name: "John Smith",
        age: 15,
      }
    `,
    options: typeOptions,
  },
  {
    id: "uh.v1.l11.s4",
    author: "uhyo",
    question: question`
      function showAll(arr: ${blank}): ${blank} {
        for (const val of arr) {
          console.log(val);
        }
      }
    `,
    options: typeOptions,
  },
  {
    id: "uh.v1.l11.s5",
    author: "uhyo",
    question: question`
      type User = {
        name: string;
        age: number;
      };

      const u: User = {
        name: ${blank},
        age: ${blank},
      }
    `,
    options: [
      f.string({ value: "uhyo" }),
      f.number({ value: 25 }),
      f.boolean({ value: false }),
    ],
  },
  {
    id: "uh.v1.l11.s6",
    author: "uhyo",
    question: question`
      type User = {
        name: string;
        age: number;
      };

      function checkUser(user: User): ${blank} {
        return user.${blank} >= 18;
      }
    `,
    options: [
      f.identifier({ value: "name" }),
      f.identifier({ value: "age" }),
      ...typeOptions,
    ],
  },
];

export default stages;
