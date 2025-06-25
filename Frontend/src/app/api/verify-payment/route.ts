import { verifyPayment } from "@/lib/paymentVerify";
import { NextResponse } from "next/server";
import { PaymentRequirements } from "x402/types";

export async function POST(req: Request) {
  const {
    payload,
    paymentRequirements,
  }: {
    payload: string;
    paymentRequirements: PaymentRequirements;
  } = await req.json();

  // const verifyPaymentBound = verifyPayment.bind(null, payment);
  // const result = await verifyPaymentBound(paymentRequirements);

  const result = await verifyPayment(payload, paymentRequirements);
  // const verifyPaymentWithPayment = verifyPayment.bind(null, payment);
  // const result = await verifyPaymentWithPayment();

  if (result.startsWith("Error")) {
    return NextResponse.json({ ok: false, error: result });
  }

  return NextResponse.json({ ok: true });
}
