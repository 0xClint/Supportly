import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string, starting = 4, ending = 4) => {
  if (!address) {
    return "";
  }

  const start = address.slice(0, starting);
  const end = address.slice(-ending);

  return `${start}...${end}`;
};

export function bigintToNumberSafe(value: bigint): number {
  if (
    value > BigInt(Number.MAX_SAFE_INTEGER) ||
    value < BigInt(Number.MIN_SAFE_INTEGER)
  ) {
    throw new Error("BigInt value is too large to convert safely to number.");
  }
  return Number(value);
}

export function isFloatString(str: string): boolean {
  return /^\d+(\.\d+)?$/.test(str.trim());
}
