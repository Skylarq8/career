import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "minii_chiglel_admin";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function getAdminSessionValue() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return null;
  }

  return hash(`minii-chiglel-admin:${password}`);
}

export function isValidAdminPassword(candidate: string) {
  const password = process.env.ADMIN_PASSWORD;

  return Boolean(password && safeEqual(hash(candidate), hash(password)));
}

export function isAdminSessionValue(value?: string | null) {
  const expected = getAdminSessionValue();

  return Boolean(value && expected && safeEqual(value, expected));
}
