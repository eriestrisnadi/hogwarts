export const shadowedChunk = <T>(arr: T[], size: number) => {
  const groups = [];

  for (var i = 0; i < arr.length; i += size) {
    groups.push(
      Array.from(
        { length: size },
        (_: T, partIndex: number) => arr.slice(i, i + size)[partIndex]
      )
    );
  }

  return groups;
};
