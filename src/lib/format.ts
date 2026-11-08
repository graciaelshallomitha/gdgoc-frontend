/** "@gdgoc.ugm" -> "gdgoc.ugm" */
export function stripAt(handle: string): string {
  return handle.replace(/^@/, "");
}