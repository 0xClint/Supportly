export const USDC_TOKEN_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

export const QUERY_PRICE = 0.1;

export const paymentRequirements = {
  scheme: "exact",
  network: "base-sepolia",
  maxAmountRequired: "10000",
  resource: "https://example.com",
  description: "Payment for a service",
  mimeType: "text/html",
  payTo: "0xf1E507654e8E8b35bf467fd255c1c5787527aC2D",
  maxTimeoutSeconds: 60,
  asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  outputSchema: undefined,
  extra: {
    name: "USDC",
    version: "2",
  },
};
