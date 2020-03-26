import { holeFactories as f } from "~/stages/holes";
import { blank, question } from "../../stages/questionDefinition";
import { StageDefinition } from "../../stages/stageDefinition";

const options = [
  f.primitive({ value: "string" }),
  f.primitive({ value: "number" }),
  f.primitive({ value: "boolean" }),
  f.primitive({ value: "any" }),
  f.union({ size: 2 }),
];

const stages: StageDefinition[] = [
  {
    id: "uh.v1.l9999.s1",
    author: "uhyo",
    question: question`
      function isAllPositive(arr: ${blank}): ${blank} {
        return arr.every(v => v > 0);
      }
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s2",
    author: "uhyo",
    question: question`
      const values: ${blank} = ["foo", 1234, "uhyo", {
        type: "puzzles"
      }];
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s3",
    author: "uhyo",
    question: question`
      const reg = /(\d{4})-\d{2}-\d{2}/g;
      function* allYears(text: string): ${blank} {
        for (const [, year] of (text as ${blank}).matchAll(reg)) {
          yield year;
        }
      }
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s4",
    author: "uhyo",
    question: question`
      function getFullName(user: ${blank}): string {
        return \`\${user.firstName} \${user.lastName}\`;
      }

      console.log(getFullName({
        name: "John the cat"
      }))
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s5",
    author: "uhyo",
    question: question`
      const f: ${blank} = (val?: ${blank}) => {
        if (val.length > 0) {
          return val[0];
        }
        return undefined;
      }
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s6",
    author: "uhyo",
    question: question`
    let result: ${blank};
    for (let i = 1; i <= 100; i++) {
      result.push(
        i % 15 === 0 ? "FizzBuzz" :
        i % 3 === 0 ? "Fizz" :
        i % 5 === 0 ? "Buzz" :
        i
      );
    }
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s7",
    author: "uhyo",
    question: question`
      const double = (num: number) => num * 2;
      const input = "1234";
      console.log(double(input as ${blank}));
    `,
    options,
  },
  {
    id: "uh.v1.l9999.s8",
    author: "uhyo",
    question: question`
      const ${blank}: ${blank} = "${blank}";
      console.log(${blank}.${blank}(${blank}));
    `,
    options,
  },
];

export default stages;
