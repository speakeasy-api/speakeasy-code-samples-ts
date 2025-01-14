export function clsx(...args: Array<string | undefined>) {
  let i = 0,
    tmp,
    str = "";
  const len = args.length;
  for (; i < len; i++) {
    if ((tmp = args[i])) {
      if (typeof tmp === "string") {
        str += (str && " ") + tmp;
      }
    }
  }
  return str;
}
