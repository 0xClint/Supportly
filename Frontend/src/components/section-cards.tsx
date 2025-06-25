"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { balanceToQueries, shortenAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { useUserData } from "@/context/UserContext";

export function SectionCards() {
  const { balances, evmAddress } = useWallet();
  const { sessionCnt } = useUserData();
  return (
    <div className="flex justify-around gap-7 my-5">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>USDC Wallet Balance</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${balances} USDC
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Wallet Address
          </div>
          <div className="text-muted-foreground flex justify-center items-center gap-2">
            <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {shortenAddress(evmAddress, 6, 6)}
            </code>
            <Button
              variant="secondary"
              className="size-7 cursor-pointer"
              onClick={async () =>
                await navigator.clipboard.writeText(evmAddress)
              }
            >
              <Copy className="h-[14px]" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Remaining Queries</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {balanceToQueries(Number(balances))}
          </CardTitle>
          <CardAction>
            {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            19 queries remaining based on your balance.
          </div>
          <div className="text-muted-foreground">
            Each query costs 0.1 USDC. Top up to stay active.
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription> User Interactions</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {sessionCnt}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Just Getting Started
          </div>
          <div className="text-muted-foreground">
            Total number of interactions your AI support has handled.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
