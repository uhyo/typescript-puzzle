export const formatQuestion = (text: readonly string[]): string[] => {
  const indentationSize = getIndentationSize(text.join(""));
  return text.map((fragment, i) => {
    const lines = fragment.split("\n");
    const resultLines = lines.map((line, j) => {
      if (j > 0 || i === 0) {
        return line.slice(indentationSize);
      } else {
        return line;
      }
    });
    // remove blank lines at the very beginning.
    if (i === 0) {
      for (let i = 0; i < resultLines.length; i++) {
        if (!/^\s*$/.test(resultLines[i])) {
          return resultLines.slice(i).join("\n");
        }
      }
    }
    return resultLines.join("\n");
  });
};

const getIndentationSize = (text: string) => {
  let max = Infinity;
  const length = text.length;
  let current = 0;
  let counting = true;
  for (let i = 0; i < length; i++) {
    const char = text[i];
    if (char === " ") {
      if (counting) {
        current++;
      }
    } else if (char === "\n") {
      // blank line is not considered.
      if (!counting && current < max) {
        max = current;
      }
      counting = true;
      current = 0;
    } else {
      counting = false;
    }
  }
  return Number.isFinite(max) ? max : 0;
};
