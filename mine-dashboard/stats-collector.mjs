import cron from "node-cron";
import { status } from "minecraft-server-util";
import fs from "fs";

const options = {
  sessionID: 1,
  enableSRV: true,
};

async function collectStats() {
  try {
    const result = await status("localhost", 25565, options);
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${JSON.stringify(result)}\n`;

    fs.appendFileSync("stats.log", logEntry);
    console.log("Statistiques enregistrées:", logEntry);
  } catch (error) {
    console.error("Erreur lors de la collecte des statistiques:", error);
  }
}

cron.schedule("* * * * *", collectStats);

console.log("La collecte des statistiques a commencé...");
