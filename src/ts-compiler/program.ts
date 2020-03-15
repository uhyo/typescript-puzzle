import ts from "typescript";

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
    return ts.createSourceFile(fileName, sourceText, languageVersion);
  },
  getDefaultLibFileName() {
    return "lib.d.ts";
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
    options: {},
    host,
    oldProgram: program,
  });
  return ts.getPreEmitDiagnostics(program);
};
