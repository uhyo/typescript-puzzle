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
  {
    id: "kc.v1.l20.s1",
    author: "kc7891",
    question: question`
      let user
      if (Math.random() < 0.5 ) {
        user = {name: 'hoge', age: 20}
      }
      const age: ${blank} = user?.age
    `,
    options: [
      f.primitive({ value: "boolean" }),
      f.primitive({ value: "number" }),
      f.primitive({ value: "string" }),
      f.primitive({ value: "undefined" }),
      f.union({ size: 2 }),
      f.union({ size: 3 }),
    ],
  },
  {
    id: "kc.v1.l20.s2",
    author: "kc7891",
    question: question`
      function calcBMI(weight: ${blank}, height: ${blank}): ${blank} {
        return "BMI is " + (weight * height);
      }
    `,
    options: [
      f.primitive({ value: "boolean" }),
      f.primitive({ value: "number" }),
      f.primitive({ value: "string" }),
      f.union({ size: 2 }),
    ],
  },
  {
    id: "kc.v1.l20.s3",
    author: "kc7891",
    question: question`
      function logCount(count: ${blank}): ${blank} {
        console.log("count:" + count)
      }
    `,
    options: [
      f.primitive({ value: "boolean" }),
      f.primitive({ value: "number" }),
      f.primitive({ value: "string" }),
      f.primitive({ value: "void" }),
      f.primitive({ value: "undefined" }),
      f.union({ size: 2 }),
    ],
  },
  {
    id: "kc.v1.l20.s4",
    author: "kc7891",
    question: question`
      type Hoge = {
        foo: string;
        bar: number;
      }
      type Piyo = {
        foo: number;
        baz: boolean;
      }

      type HogePiyo = Hoge | Piyo;

      function getFoo(obj: HogePiyo): ${blank} {
          return obj.foo;
      }
    `,
    options: [
      f.primitive({ value: "boolean" }),
      f.primitive({ value: "number" }),
      f.primitive({ value: "string" }),
      f.primitive({ value: "void" }),
      f.primitive({ value: "undefined" }),
      f.union({ size: 2 }),
    ],
  },
];

export default stages;
