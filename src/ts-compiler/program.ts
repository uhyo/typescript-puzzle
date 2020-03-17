import ts from "typescript";
import { defaultLibFileName, getLibContent } from "./lib";

const srcFileName = "/src/index.ts";
let program: ts.Program | undefined;
let sourceText: string = "";

const host: ts.CompilerHost = {
  fileExists(fileName) {
    console.log("fileExists", fileName);
    return fileName === srcFileName;
  },
  readFile(fileName) {
    console.log("readFile", fileName);
    return sourceText;
  },
  getSourceFile(fileName, languageVersion) {
    console.log("getSourceFile", fileName);
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
  console.log("got sourceText:", source);
  program = ts.createProgram({
    rootNames: [srcFileName],
    options: {},
    host,
    oldProgram: program,
  });
  console.log("program:", program);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  console.log(diagnostics);
  return diagnostics;
};
