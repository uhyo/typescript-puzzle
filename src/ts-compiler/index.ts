// @ts-ignore
import Worker from "comlink-loader!./worker.ts";
import ts from "typescript";

export class RemoteCompiler {
  private readonly worker: any;
  constructor() {
    this.worker = new Worker();
  }
  async getDiagnostics(
    sourceText: string,
  ): Promise<ts.Diagnostic[] | undefined> {
    try {
      const start = performance.now();
      const d = await this.worker.getDiagnostics(sourceText);
      const end = performance.now();
      console.log("compiled in ", end - start, "ms");
      // await new Promise(resolve => setTimeout(resolve, 1 * 1e3));
      return d;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
  async terminate() {
    return await this.worker.terminate();
  }
}
