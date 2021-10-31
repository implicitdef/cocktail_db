function reverse(s) {
  return s.split("").reverse().join("");
}
export const domain = reverse("apliatkcoc") + "rtyapp.com";

export function cleanHtmlStr(s) {
  return s.replace(/\s+/g, " ");
}
export function uniq(arr) {
  return [...new Set(arr)];
}
