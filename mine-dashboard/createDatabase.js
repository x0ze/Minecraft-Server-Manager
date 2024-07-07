import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import fs from "fs/promises";

async function createDatabase() {
  const db = await open({
    filename: "./minecraft_stats.db",
    driver: sqlite3.Database,
  });

  const script = await fs.readFile("create_database.sql", "utf8");
  await db.exec(script);

  console.log("Base de données et tables créées avec succès");
  await db.close();
}

createDatabase().catch((err) => console.error(err));
