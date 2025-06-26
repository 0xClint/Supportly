import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BedrockEmbeddings } from "@langchain/aws";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { StateGraph } from "@langchain/langgraph";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createFile, loadJsonFromTextFile } from "./utils";

//chat model
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
});

//AI model
export const embeddings = new BedrockEmbeddings({
  model: "amazon.titan-embed-text-v1",
  region: process.env.BEDROCK_AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY || "",
  },
});

const InputSchema = z.object({
  question: z.string(),
});

const FullStateSchema = z.object({
  question: z.string(),
  context: z.array(z.any()), 
  answer: z.string(),
});

export async function buildGraph(vectorStore: MemoryVectorStore) {
  const promptTemplate = await pull<ChatPromptTemplate>("rlm/rag-prompt");

  const retrieve = async (state: z.infer<typeof InputSchema>) => {
    const context = await vectorStore.similaritySearch(state.question, 4);
    return { context };
  };

  const generate = async (state: z.infer<typeof FullStateSchema>) => {
    const docsText = state.context
      .map((doc: Document) => doc.pageContent)
      .join("\n");

    const messages = await promptTemplate.formatMessages({
      question: state.question,
      context: docsText,
    });

    const result = await llm.invoke(messages);
    return { answer: result.content as string };
  };

  const graph = new StateGraph(FullStateSchema)
    .addNode("retrieve", retrieve)
    .addNode("generate", generate)
    .addEdge("__start__", "retrieve")
    .addEdge("retrieve", "generate")
    .addEdge("generate", "__end__")
    .compile();

  return graph;
}
