import level1 from "~/problems/level1";
import { StageDefinition } from "~/problems/stageDefinition";

/**
 * Data store which holds stage data.
 */
export class StageStore {
  /**
   * Loaded problems.
   */
  private stageMap = new Map<string, StageDefinition>();

  constructor() {
    this.loadStages(level1);
  }

  /**
   * Returns the stage with given ID.
   * If such a stage does not exist, throws a Promise.
   */
  public getStage(id: string) {
    const s = this.stageMap.get(id);
    if (s) {
      return s;
    }
    // TODO
    throw new Error("Stage does not exist");
  }

  private loadStages(stages: StageDefinition[]) {
    for (const stage of stages) {
      this.stageMap.set(stage.id, stage);
    }
  }
}
