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
type HoleDefinitionsObject = Aux_HoleDefinitionsObject<HoleValue["type"]>;
/**
 * hole definiton for each hole type.
 */
export const holeDefs: HoleDefinitionsObject = {} as any;
for (const d of holeDefinitions) {
  (holeDefs as any)[d.type] = d;
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
