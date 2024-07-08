import { NextRequest, NextResponse } from "next/server";
import { status } from "minecraft-server-util";

export async function GET(req: NextRequest, res: NextResponse) {
  const options = {
    timeout: 1000 * 5,
    enableSRV: true,
  };

  try {
    const result = await status("localhost", 25565, options);
    return NextResponse.json({ status: "done", result });
  } catch (error) {
    return NextResponse.json({ status: "error" });
  }
}
