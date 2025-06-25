import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { paymentMiddleware, Resource } from "x402-express";
import { buildGraph, embeddings, initGraph } from "./chatbot";
import { fetchVector, pinata } from "./pinata";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const app = express();
const PORT = process.env.PORT || 4021;
const facilitatorUrl = process.env.FACILITATOR_URL as Resource;
const payTo = process.env.ADDRESS as `0x${string}`;
const pricePerCall = process.env.SERVICE_PRICE;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL"); // Allow iframe embedding
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow external domains
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  paymentMiddleware(
    payTo,
    {
      "POST /chat": {
        price: `$${pricePerCall}`,
        network: "base-sepolia",
      },
    },
    {
      url: facilitatorUrl,
    }
  )
);

// POST /chat route
app.post("/chat", async (req: Request, res: Response) => {
  const { prompt, projectId } = req.body;
  console.log(prompt, projectId);

  if (!projectId || !prompt) {
    res.status(400).json({ error: "Both projectId and prompt are required!" });
  }

  try {
    const data = await fetchVector(projectId);

    if (!data || typeof data !== "string") {
      throw new Error("Expected response.data to be a JSON string");
    }
    const docs = JSON.parse(data);

    const vectorStore = new MemoryVectorStore(embeddings);
    await vectorStore.addDocuments(docs);
    const graph = await buildGraph(vectorStore);

    const result = await graph.invoke({ question: prompt });
    console.log(result.answer); // or use appropriate method

    // res.status(200).json({ reply: result ?? "No response." });
    res.status(200).json({ reply: result.answer });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ***********************************************************
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Chatbot server running at http://localhost:${PORT}`);
});
