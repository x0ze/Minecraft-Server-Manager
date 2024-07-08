import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function POST(req: NextRequest, res: NextResponse) {
  const { serverId } = await req.json();
  const db: Database = await open({
    filename: "./minecraft_stats.db",
    driver: sqlite3.Database,
  });

  const serverInfo = await db.get(
    `SELECT server_name FROM Server WHERE id_server = ?`,
    [serverId]
  );
  await db.close();
  const execSync = require("child_process").execSync;
  const output = execSync(
    `/servers/stopServer.sh "${serverInfo.server_name}"`,
    {
      encoding: "utf-8",
    }
  );
  const splitted = output.split(/\r?\n/);
  const filtered = splitted.filter((e: string) => {
    return e !== "";
  });

  return NextResponse.json({ status: "done" });
}
