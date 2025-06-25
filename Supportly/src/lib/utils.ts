import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QUERY_PRICE } from "./constants";
import { User } from "./db/db.types";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

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

export function balanceToQueries(balance: number) {
  return Math.floor(balance / QUERY_PRICE);
}

export function isFloatString(str: string): boolean {
  return /^\d+(\.\d+)?$/.test(str.trim());
}

export function getInitials(name: string = "AB"): string {
  const words = name.trim().split(/\s+/); // split by whitespace
  const initials = words.slice(0, 2).map((word) => word[0].toUpperCase());
  return initials.join("");
}

export function totalSessionsCount(user: User): number {
  return user.projects.reduce(
    (total, project) => total + project.sessions.length,
    0
  );
}

export async function loadAndSplitTextFromBlob(
  file: File
): Promise<Document[]> {
  const text = await file.text(); // read uploaded .txt file as string

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([text]);
  return docs;
}

export const createJsonFileFromDocs = (
  docs: Document[],
  filename = "vector-response.json"
) => {
  const json = JSON.stringify(docs, null, 2); // Pretty-print the structure
  return new File([json], filename, { type: "application/json" });
};

export function generateEmbedIframe(
  endpoint: string,
  userId: string,
  projectId: string,
  data_url: string
): string {
  const src = `${endpoint}/chat.html?userId=${encodeURIComponent(
    userId
  )}&projectId=${encodeURIComponent(projectId)}&dataUrl=${encodeURIComponent(
    data_url
  )}`;

  return `<iframe
  src="${src}"
  width="300"
  height="400"
  style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          border: "none",
          zIndex: 9999,
        }}
></iframe>`;
}
