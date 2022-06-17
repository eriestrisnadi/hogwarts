export const humanizeBoolean = (value: any): string =>
  typeof value === "boolean" ? (value ? "Yes" : "No") : "-";
