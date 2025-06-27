#  Supportly: Plug-and-Play AI Customer Support

Demo : https://supportly-pillup.vercel.app

Walkthrough : https://youtu.be/jkMycE7WDXU

**Supportly** provides a  **plug-and-play AI support system** where users can upload their own data and pay only when customers ask questions using x402 microtransactions in USDC. This makes smart, personalized support affordable and easy to use. Under the hood, **AI RAG (Retrieval-Augmented Generation)** is used to ensure that responses are accurate and based on the user’s uploaded content.
Users can:
-   Upload reference data for tailored responses,
-   Choose their preferred AI model (ChatGPT, Claude, Gemini, etc.),
-   Embed a smart chatbot into their website instantly,
-   Use **x402-enabled microtransactions** to pay only when customer queries occur.

![image](https://assets.devfolio.co/content/43163c39dd6640008948f192eb303618/582e1271-aaea-4956-9a23-2ad46ddda99e.png)

In Supportly, x402Pay EIP messages are used on the frontend to let users easily top up their Supportly wallets with USDC. This wallet is managed through the CDP Wallet API, It acts as the user’s on-platform wallet, tracking balances and enabling seamless fund management, top-ups, and withdrawals through the CDP Wallet API.

Whenever a customer sends a query through the support chat, the Payment Mediator backend processes the request and pays the chosen AI model via x402 directly from the user’s CDP wallet. This enables smooth, pay-per-query payments using the x402 payment standard.