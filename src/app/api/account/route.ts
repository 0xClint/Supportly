import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cdpClient } from "@/lib/cdpClient";
import { hashEmail } from "@/lib/db/user";

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  try {
    const account = await cdpClient.evm.getOrCreateAccount({
      name: hashEmail(session?.user.email || "clintty"),
    });
    console.log(account);
    return NextResponse.json({ address: account.address });
  } catch (error) {
    console.error("Error creating wallet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
