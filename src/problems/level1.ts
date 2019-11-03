import { problem } from "./problemDefinition";
import { typeHole } from "./problemDefinition/hole";

export default [
  problem`
        const value: ${typeHole("string")} = ${typeHole("number")} "foobar";
    `,
];
