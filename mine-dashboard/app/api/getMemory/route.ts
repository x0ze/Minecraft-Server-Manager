import { NextRequest, NextResponse } from "next/server";
import os from "os-utils";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return new Promise<NextResponse>((resolve) => {
    os.totalmem();
    os.freemem();

    setTimeout(() => {
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const memoryUse = totalMem - freeMem;

      resolve(
        NextResponse.json({
          use: (memoryUse / 1024).toFixed(1),
          total: (totalMem / 1024).toFixed(1),
        })
      );
    }, 100);
  });
}
