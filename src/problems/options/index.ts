export type Option = {
  type: "type";
  value: string;
};
/**
 * Option which is a type.
 */
export const typeOption = (value: string): Option => ({
  type: "type",
  value,
});
