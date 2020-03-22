import ts from "typescript";
import { defaultLibFileName, getLibContent } from "./lib";

const srcFileName = "/src/index.ts";
let program: ts.Program | undefined;
let sourceText: string = "";

const host: ts.CompilerHost = {
  fileExists(fileName) {
    return false;
  },
  readFile(fileName) {
    return "";
  },
  getSourceFile(fileName, languageVersion) {
    if (fileName === srcFileName) {
      return ts.createSourceFile(fileName, sourceText, languageVersion);
    } else {
      return ts.createSourceFile(
        fileName,
        getLibContent(fileName),
        languageVersion,
      );
    }
  },
  getDefaultLibFileName() {
    return defaultLibFileName;
  },
  writeFile() {},
  getCurrentDirectory() {
    return "/src";
  },
  getCanonicalFileName(fileName) {
    return fileName;
  },
  useCaseSensitiveFileNames() {
    return true;
  },
  getNewLine() {
    return "\n";
  },
};

/**
 * set sourceText and get Program.
 */
export const getDiagnostics = (source: string) => {
  sourceText = source;
  program = ts.createProgram({
    rootNames: [srcFileName],
    options: {
      lib: ["lib.es2020.d.ts", "lib.custom.d.ts"],
      target: ts.ScriptTarget.ESNext,
    },
    host,
    oldProgram: program,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  return diagnostics;
};
