import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { execSync } from "child_process";

export async function POST(req: NextRequest) {
  const {
    server_version,
    version,
    serverName,
    server_motd,
    server_image,
    server_memory,
    version_name,
  } = await req.json();
  const creation_time = new Date().toISOString();
  const output = execSync(
    `/servers/getServer.sh ${server_version} "${version}" "${serverName}" ${server_memory}`,
    { encoding: "utf-8" }
  );

  const splitted = output.split(/\r?\n/);
  const filtered = splitted.filter((e: string) => e !== "");

  try {
    const db: Database = await open({
      filename: "./minecraft_stats.db",
      driver: sqlite3.Database,
    });

    const result = await db.run(
      "INSERT INTO Server (server_name, version_name, version, server_motd, server_image, server_memory, creation_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
      serverName,
      version_name,
      version,
      server_motd,
      server_image,
      server_memory,
      creation_time
    );

    await db.close();
    return NextResponse.json({ status: "done", serverId: result.lastID });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données:", error);
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
}
