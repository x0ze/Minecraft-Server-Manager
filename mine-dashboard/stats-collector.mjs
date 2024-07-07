import cron from "node-cron";
import { status } from "minecraft-server-util";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";

const options = {
  sessionID: 1,
  enableSRV: true,
};

async function collectStats() {
  try {
    const serverOnline = await fetch("http://localhost:3000/api/onlineServer");
    const serverPing = await serverOnline.json();
    const serverStatus = serverPing == "offline" ? false : true;
    console.log(serverPing);
    const timestamp = new Date().toISOString();
    const db = await open({
      filename: "./minecraft_stats.db",
      driver: sqlite3.Database,
    });

    if (serverStatus == true) {
      const serverName = serverPing;
      const result = await status("localhost", 25565, options);
      const serverPing = result.roundTripLatency;
      const serverMotd = result.motd.clean;
      const playerCount = result.players.online;
      const players = result.players.sample || [];

      const serverIdRow = await db.get(
        `SELECT id_server FROM Server WHERE server_name = ?`,
        serverName
      );
      const serverId = serverIdRow ? serverIdRow.id_server : null;

      for (const player of players) {
        await db.run(
          `INSERT INTO statistic_server (stats_ping, server_status, player_pseudo, player_uuid, stats_number_connected, server_max_player, time_stats, server_motd, fk_server) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          serverPing,
          serverStatus,
          player.name,
          player.id,
          playerCount,
          playerCount,
          timestamp,
          serverMotd,
          serverId
        );
      }
      await db.close();

      const logEntry = `${timestamp} - ${JSON.stringify(result)}\n`;
      console.log("Statistiques enregistrées:", logEntry);
    } else {
      await db.run(
        `INSERT INTO statistic_server (server_status, time_stats) VALUES (0, ?)`,
        timestamp
      );
      await db.close();
    }
  } catch (error) {
    console.error("Error to get statistic :", error);
  }
}

cron.schedule("* * * * *", collectStats);

console.log("La collecte des statistiques a commencé...");
