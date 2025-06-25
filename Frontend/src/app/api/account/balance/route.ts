import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { cdpClient } from "@/lib/cdpClient";
import { getBalanceForAddress } from "@/lib/balance";
import { hashEmail } from "@/lib/db/user";

export async function GET() {
  const session = await getServerSession(authOptions);

  const account = await cdpClient.evm.getAccount({
    name: hashEmail(session?.user.email || "clintty"),
  });

  try {
    const balance = await getBalanceForAddress(account.address);
    return NextResponse.json({ balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
