import { holeDefinitions } from "~/definitions/holes";
import { HoleDefinition } from "./holeDefinition";

type AllHoleDefinitions = typeof holeDefinitions[number];
type Aux_GetHoleValue<HD> = HD extends HoleDefinition<infer T, infer H>
  ? {
      type: T;
    } & H
  : never;
/**
 * Type of all possible holes.
 */
export type HoleValue = Aux_GetHoleValue<AllHoleDefinitions>;

export type HoleValueOfType<T extends HoleValue["type"]> = Extract<
  HoleValue,
  { type: T }
>;

type Aux_GetHoleDefiniton<T, AHD = AllHoleDefinitions> = AHD extends any
  ? Aux_GetHoleValue<AHD> extends { type: T }
    ? AHD
    : never
  : never;
type Aux_HoleDefinitionsObject<Types extends HoleValue["type"]> = {
  readonly [K in Types]: Aux_GetHoleDefiniton<K>;
};
type HoleDefinitionsByType = Aux_HoleDefinitionsObject<HoleValue["type"]>;
type Aux_AnyFunctionWithHoleParameter<H> = (hole: H, ...args: any[]) => any;
type Aux_HoleDefinitionsObjectAll = {
  readonly [K in keyof HoleDefinition<string, HoleValue>]: HoleDefinition<
    string,
    HoleValue
  >[K] extends Aux_AnyFunctionWithHoleParameter<HoleValue>
    ? HoleDefinition<string, HoleValue>[K]
    : unknown;
};
type Aux_NonUnknownKeys = {
  [K in keyof Aux_HoleDefinitionsObjectAll]: unknown extends Aux_HoleDefinitionsObjectAll[K]
    ? never
    : K;
}[keyof Aux_HoleDefinitionsObjectAll];
type HoleDefinitionsObject = {
  readonly [K in Aux_NonUnknownKeys]: Aux_HoleDefinitionsObjectAll[K];
};
/**
 * hole definiton for each hole type.
 */
const holeDefsByType: HoleDefinitionsByType = {} as any;
for (const d of holeDefinitions) {
  (holeDefsByType as any)[d.type] = d;
}
/**
 * collection of hole functions.
 */
export const holeDefs: HoleDefinitionsObject = {} as any;
for (const d of holeDefinitions) {
  for (const n of Object.keys(d)) {
    const v = (d as any)[n];
    if (typeof v === "function" && !(holeDefs as any)[n]) {
      (holeDefs as any)[n] = (hole: HoleValue, ...args: any[]) =>
        (holeDefsByType as any)[hole.type][n](hole, ...args);
    }
  }
}

type Aux_HoleFactoriesObject<Types extends HoleValue["type"]> = {
  readonly [K in Types]: (
    hole: Omit<Extract<HoleValue, { type: K }>, "type">,
  ) => Extract<HoleValue, { type: K }>;
};
type HoleFactoriesObject = Aux_HoleFactoriesObject<HoleValue["type"]>;
export const holeFactories: HoleFactoriesObject = {} as any;
for (const d of holeDefinitions) {
  (holeFactories as any)[d.type] = (def: any) => ({
    type: d.type,
    ...def,
  });
}

/**
 * Option which is a type.
 * @deprecated
 */
export const typeOption = (value: string): HoleValue => ({
  type: "primitive",
  value,
});

/**
 * Option which is a union.
 * @deprecated
 */
export const unionOption = (size: number): HoleValue => ({
  type: "union",
  size,
});
