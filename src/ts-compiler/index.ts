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
      const d = await this.worker.getDiagnostics(sourceText);
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
