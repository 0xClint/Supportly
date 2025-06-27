import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { PaymentRequirements, PaymentPayload } from "x402/types";
import { preparePaymentHeader } from "x402/client";
import { getNetworkId } from "x402/shared";
import { exact } from "x402/schemes";
import { injected, useAccount, useConnect, useSignTypedData } from "wagmi";
import { useWallet } from "@/context/WalletContext";
import { isFloatString } from "@/lib/utils";

interface PaymentProps {
  evmAddress: string;
}

function PaymentForm({ evmAddress }: PaymentProps) {
  const { address } = useAccount();
  const { refreshBalance } = useWallet();
  const { connect } = useConnect();
  const [value, setValue] = useState<string>("5");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { signTypedDataAsync } = useSignTypedData();

  async function handlePayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFloatString(value)) return;
    connect({ connector: injected() });

    const paymentRequirements: PaymentRequirements = {
      scheme: "exact",
      network: "base-sepolia",
      maxAmountRequired: String(Number(value) * 1000000),
      resource: "https://example.com",
      description: "Payment for a service",
      mimeType: "text/html",
      payTo: evmAddress,
      maxTimeoutSeconds: 60,
      asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      outputSchema: undefined,
      extra: {
        name: "USDC",
        version: "2",
      },
    };

    setIsProcessing(true);
    setMessage(null);

    if (!address) return;
    try {
      const unSignedPaymentHeader = preparePaymentHeader(
        address,
        1,
        paymentRequirements
      );

      const eip712Data = {
        types: {
          TransferWithAuthorization: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "validAfter", type: "uint256" },
            { name: "validBefore", type: "uint256" },
            { name: "nonce", type: "bytes32" },
          ],
        },
        domain: {
          name: paymentRequirements.extra?.name,
          version: paymentRequirements.extra?.version,
          chainId: getNetworkId(paymentRequirements.network),
          verifyingContract: paymentRequirements.asset as `0x${string}`,
        },
        primaryType: "TransferWithAuthorization" as const,
        message: unSignedPaymentHeader.payload.authorization,
      };

      const signature = await signTypedDataAsync(eip712Data);

      const paymentPayload: PaymentPayload = {
        ...unSignedPaymentHeader,
        payload: {
          ...unSignedPaymentHeader.payload,
          signature,
        },
      };

      const payload: string = exact.evm.encodePayment(paymentPayload);

      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload, paymentRequirements }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      await refreshBalance();
      console.log("result", result);
      setMessage("✅ Payment successful!");
      setSuccess(true);
    } catch (error) {
      console.error("❌ Payment error:", error);
      setMessage(`❌ Payment failed: ${error || "Unknown error"}`);
    } finally {
      setIsProcessing(false);
      setTimeout(async () => {
        await refreshBalance();
      }, 2000);
    }
  }

  return (
    <>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Plus /> Topup Wallet
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        showCloseButton={false}
        preventOutsideClose={true}
      >
        <form onSubmit={handlePayment}>
          {isSuccess ? (
            <DialogHeader className="my-4">
              <DialogTitle>Wallet Topped Up</DialogTitle>
              <DialogDescription>
                {`You have successfully added ${value} USDC to your Supportly wallet.
                You are all set to handle new queries!`}
              </DialogDescription>
            </DialogHeader>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Topup Wallet</DialogTitle>
                <DialogDescription>Each query costs 0.1 USDC</DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-4">
                <Label htmlFor="name-1">Amount</Label>
                <Input
                  id="name-1"
                  type="text"
                  name="name"
                  value={value}
                  disabled={isProcessing}
                  min={"0"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d*$/.test(val)) {
                      setValue(val);
                    }
                  }}
                />
              </div>
            </>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isProcessing}>
                Close
              </Button>
            </DialogClose>
            {!isSuccess && (
              <Button type="submit" disabled={isProcessing}>
                {isProcessing && <LoaderCircle className="animate-spin" />}{" "}
                Topup
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}

export function TopupWalletDialog() {
  const { evmAddress, fetchEvmAddress } = useWallet();
  const handleClick = async () => {
    console.log("clcick");
  };

  return (
    <Dialog>{evmAddress && <PaymentForm evmAddress={evmAddress} />}</Dialog>
  );
}
