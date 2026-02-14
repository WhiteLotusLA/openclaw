import { timingSafeEqual } from "node:crypto";

export function safeEqualSecret(
  provided: string | undefined | null,
  expected: string | undefined | null,
): boolean {
  if (typeof provided !== "string" || typeof expected !== "string") {
    return false;
  }
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  // Pad to equal length to avoid leaking the expected secret's length
  // via timing side-channel. The length check result is folded into the
  // final boolean so the timingSafeEqual call always executes.
  const maxLen = Math.max(providedBuffer.length, expectedBuffer.length);
  const a = Buffer.alloc(maxLen);
  const b = Buffer.alloc(maxLen);
  providedBuffer.copy(a);
  expectedBuffer.copy(b);
  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(a, b);
}
