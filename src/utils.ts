import path from "path";
import fs from "fs/promises";

export const createFile = async (response: Object) => {
  // Define file path (same directory)
  const filePath = path.join(__dirname, "vector-response.txt");

  // Write response to file as pretty JSON
  await fs.writeFile(filePath, JSON.stringify(response, null, 2), "utf-8");

  console.log("✅ Response saved to vector-response.txt");
};

export async function loadJsonFromTextFile(fileName: string) {
  const filePath = path.join(__dirname, fileName);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const jsonData = JSON.parse(fileContent);
  return jsonData;
}
