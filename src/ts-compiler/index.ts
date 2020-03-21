// @ts-ignore
import Worker from "comlink-loader?name=[contenthash].tsc.worker.js!./worker.ts";
import ts from "typescript";

const cacheTime = 10 * 60 * 1000;
let workerCache:
  | {
      worker: Worker;
      terminateTimer: number;
    }
  | undefined;

export class RemoteCompiler {
  private readonly worker: any;
  constructor() {
    if (workerCache) {
      this.worker = workerCache.worker;
      clearTimeout(workerCache.terminateTimer);
      workerCache = undefined;
    } else {
      this.worker = new Worker();
    }
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
    if (workerCache === undefined) {
      const worker = this.worker;
      workerCache = {
        worker,
        terminateTimer: setTimeout(() => {
          worker.terminate();
          workerCache = undefined;
        }, cacheTime),
      };
    } else {
      await this.worker.terminate();
    }
  }
}
