import { createHash } from "crypto";

export function hashEmail(email: string): string {
  return `sptly-${createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 16)}z`;
}
