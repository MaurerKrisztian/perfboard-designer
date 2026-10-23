// Joins the class names that are set: cx("bar-btn", on && "is-on") is "bar-btn is-on" or "bar-btn".
export function cx(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
