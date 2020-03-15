// @ts-ignore
import Worker from "comlink-loader!./worker.ts";
import ts from "typescript";

export class RemoteCompiler {
  private readonly worker: any;
  constructor() {
    this.worker = new Worker();
  }
  async getDiagnostics(sourceText: string): Promise<ts.Diagnostic[]> {
    return await this.worker.getDiagnostics(sourceText);
  }
  async terminate() {
    return await this.worker.terminate();
  }
}
