"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shortenAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

export function SectionCards() {
  const { balances, evmAddress } = useWallet();
  return (
    <div className="flex justify-around gap-7 my-5">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Wallet Balance</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${balances} USDC
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Wallet Address
            {/* <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground flex justify-center items-center gap-2">
            {shortenAddress(evmAddress, 6, 6)}
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
          <CardDescription>Queries Left</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0
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
            Trending up this month
            {/* <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Total User Interactions</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month
            {/* <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
