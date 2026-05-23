export function publicApiPath(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

  return `${base}${path}`;
}
