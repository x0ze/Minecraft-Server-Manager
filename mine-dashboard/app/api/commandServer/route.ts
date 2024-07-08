import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const execSync = require("child_process").execSync;
  const output = execSync(
    '/servers/commandServer.sh "test-server-forge-db" "op darklink83"',
    { encoding: "utf-8" }
  );
  const splitted = output.split(/\r?\n/);
  const filtered = splitted.filter((e: string) => {
    return e !== "";
  });

  return NextResponse.json({ status: "done" });
}
