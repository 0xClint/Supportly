import { NextRequest, NextResponse } from "next/server";
import { addProjectToUser } from "@/lib/db/user";

export async function POST(req: NextRequest) {
  try {
    const res = (await req.json()) as {
      user_id: string;
      name: string;
      logo_url: string;
      model: string;
      data_url: string;
      website_url: string;
      embedded_url: string;
    };
    console.log(res);
    if (!res.user_id) {
      return NextResponse.json(
        { error: "Missing user_id or project" },
        { status: 400 }
      );
    }

    await addProjectToUser(res);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in add-project API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
