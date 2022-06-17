export const isArray = (value: any): boolean =>
  Object.prototype.toString.call(value) === "[object Array]";
