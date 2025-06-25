import { useFacilitator } from "x402/verify";
import { PaymentRequirements } from "x402/types";
import { exact } from "x402/schemes";

export async function verifyPayment(
  payload: string,
  paymentRequirements: PaymentRequirements
): Promise<string> {
  const { verify, settle } = useFacilitator(); // eslint-disable-line

  try {
    const payment = exact.evm.decodePayment(payload);
    console.log("[payment]: ", payment);
    const valid = await verify(payment, paymentRequirements);

    if (!valid.isValid) {
      throw new Error(valid.invalidReason);
    }

    const settleResponse = await settle(payment, paymentRequirements);

    if (!settleResponse.success) {
      throw new Error(settleResponse.errorReason);
    }
  } catch (error) {
    console.error({ error });
    return `Error: ${error}`;
  }

  return "✅ Payment verified and settled successfully!";
}
