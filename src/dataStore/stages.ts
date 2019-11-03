import level1 from "~/problems/level1";
import { Level, levels } from "~/problems/levels";
import { StageDefinition } from "~/problems/stageDefinition";

/**
 * Data store which holds stage data.
 */
export class StageStore {
  /**
   * Loaded problems.
   */
  private levels: Partial<Record<Level, StageDefinition[]>> = {};
  /**
   * Map from stage ID to level.
   */
  private stageToLevel: Map<string, Level> = new Map();

  constructor() {
    this.loadStages(levels[1], level1);
  }

  /**
   * Returns the stage with given ID.
   * If such a stage does not exist, throws a Promise.
   */
  public getStage(id: string) {
    const level = this.stageToLevel.get(id);
    const stages = level && this.levels[level];
    if (stages) {
      const s = stages.find(s => s.id === id);
      if (s) {
        return s;
      }
    }
    // TODO
    throw new Error("Stage does not exist");
  }

  private loadStages(level: Level, stages: StageDefinition[]) {
    this.levels[level] = [...stages];
    for (const stage of stages) {
      this.stageToLevel.set(stage.id, level);
    }
  }
}
