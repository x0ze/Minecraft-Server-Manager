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
    const serverCheck = await serverOnline.json();
    const serverStatus = serverCheck === "offline" ? false : true;
    const timestamp = new Date().toISOString();
    const db = await open({
      filename: "./minecraft_stats.db",
      driver: sqlite3.Database,
    });

    const serverName = serverCheck;
    const result = serverStatus
      ? await status("localhost", 25565, options)
      : null;

    const serverPing = serverStatus ? result.roundTripLatency : null;
    const serverMotd = serverStatus ? result.motd.clean : null;
    const playerCount = serverStatus ? result.players.online : 0;
    const players = serverStatus ? result.players.sample || [] : [];
    const maxPlayer = serverStatus ? result.players.max : null;

    const serverIdRow = await db.get(
      `SELECT id_server FROM Server WHERE server_name = ?`,
      serverName
    );
    const serverId = serverIdRow ? serverIdRow.id_server : null;

    let playerNames = "";
    let playerUUIDs = "";

    if (players.length > 0) {
      players.forEach((player, index) => {
        playerNames += player.name;
        playerUUIDs += player.id;
        if (index < players.length - 1) {
          playerNames += ", ";
          playerUUIDs += ", ";
        }
      });
    }

    if (serverStatus) {
      await db.run(
        `INSERT INTO statistic_server (stats_ping, server_status, player_pseudo, player_uuid, stats_number_connected, server_max_player, time_stats, server_motd, fk_server) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        serverPing,
        serverStatus,
        playerNames,
        playerUUIDs,
        playerCount,
        maxPlayer,
        timestamp,
        serverMotd,
        serverId
      );
    } else {
      await db.run(
        `INSERT INTO statistic_server (server_status, time_stats) VALUES (?, ?)`,
        0,
        timestamp
      );
    }

    await db.close();

    console.log(
      "Statistiques enregistrées:",
      timestamp,
      serverStatus ? result : "Serveur hors ligne"
    );
  } catch (error) {
    console.error("Erreur lors de la collecte des statistiques :", error);
  }
}

cron.schedule("* * * * *", collectStats);

console.log("La collecte des statistiques a commencé...");
