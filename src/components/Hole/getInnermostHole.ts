/**
 * Search for innermost element with `data-holeId` attribute.
 */
export const getInnermostHole = (element: Node): string | undefined => {
  let node: any = element;
  while (node) {
    if (node.dataset?.holeid) {
      return node.dataset.holeid;
    }
    node = node.parent;
  }
  return undefined;
};
