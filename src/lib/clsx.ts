/**
 * Concatenates a list of string arguments into a single string with
 * space-separated values. Filters out any `undefined` values from the input
 * arguments.
 */
export function clsx(...classes: Array<string | boolean | undefined>) {
  let i = 0,
    tmp,
    str = "";
  const len = classes.length;
  for (; i < len; i++) {
    if ((tmp = classes[i])) {
      if (typeof tmp === "string") {
        str += (str && " ") + tmp;
      }
    }
  }
  return str;
}
