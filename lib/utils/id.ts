import { randomBytes } from "crypto";

export function generatePublicId(prefix = "lucent"): string {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}

