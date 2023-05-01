export function instance() {
  if (typeof window === "undefined") return;
  return localStorage;
}
