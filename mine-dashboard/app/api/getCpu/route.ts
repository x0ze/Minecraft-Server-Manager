import { NextRequest, NextResponse } from "next/server";
import os from "os-utils";

export async function GET(req: NextRequest) {
  return new Promise<NextResponse>((resolve) => {
    os.cpuUsage((v) => {
      resolve(NextResponse.json({ cpu: v }));
    });
  });
}
