import { formatUnits } from "viem";
import { getNetworkConfig } from "@/lib/network";
import { cdpClient } from "./cdpClient";
import { USDC_TOKEN_ADDRESS } from "./constants";

const { network } = getNetworkConfig();

export const getBalanceForAddress = async (
  address: `0x${string}`
): Promise<string> => {
  const balances = await cdpClient.evm.listTokenBalances({
    address,
    network,
  });
  console.log(balances);

  const tokenBalance = balances.balances.find(
    (b) => b.token?.contractAddress === USDC_TOKEN_ADDRESS
  );
  if (!tokenBalance) {
    return "0";
  }
  // return "hello";
  return formatUnits(tokenBalance.amount.amount, tokenBalance.amount.decimals);
};
