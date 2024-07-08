import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  const execSync = require("child_process").execSync;
  const output = execSync(
    `ps -eo pid,etime,comm | grep screen | awk '{split($2, a, ":"); gsub(/^0/, "", a[1]); print a[1] ":" a[2]}'`,
    {
      encoding: "utf-8",
    }
  );
  const splitted = output.split(/\r?\n/);
  const filtered = splitted.filter((e: string) => {
    return e !== "";
  });

  return NextResponse.json({ timeUp: filtered });
}
