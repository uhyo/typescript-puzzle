import { tsLibs } from "~/generated/tslib";

const libDir = "/lib";
export const defaultLibFileName = `${libDir}/lib.es2020.d.ts`;

export const getLibContent = (libFileName: string) => {
  const m = libFileName.match(/lib\.(.+)\.d\.ts$/);
  if (m) {
    const c = tsLibs[m[1]];
    if (c) {
      return c;
    }
  }
  throw new Error(`'${libFileName}' does not exist`);
};
