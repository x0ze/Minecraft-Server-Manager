import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const execSync = require("child_process").execSync;
  const output = execSync(
    `screen -ls | grep "Detached"| awk '{print $1}' | cut -d. -f 2`,
    {
      encoding: "utf-8",
    }
  );
  const splitted = output.split(/\r?\n/);
  let filtered = splitted.filter((e: string) => e !== "");

  if (filtered.length === 0) {
    filtered = "offline";
  } else if (filtered.length === 1) {
    filtered = filtered[0];
  }
  return NextResponse.json(filtered);
}
