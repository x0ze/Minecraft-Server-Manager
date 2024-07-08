import { CardStats } from "@/components/charts/cardStats";
import { useState, useEffect } from "react";

interface CardData {
  value: number;
  label: string;
  title: string;
  color: string;
}

export default function CardGroup() {
  const [cards, setCards] = useState<CardData[]>([
    { value: -1, label: "Status", title: "Offline", color: "red" },
    { value: -1, label: "Ping", title: "-", color: "red" },
    { value: -1, label: "Player", title: "-", color: "red" },
    { value: -1, label: "Up time", title: "-", color: "red" },
    { value: 1, label: "Processor", title: "1%", color: "green" },
    { value: 1, label: "Memory", title: "- GB", color: "green" },
  ]);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch("/api/onlineServer");
        const data = await response.json();
        const serverIsOnline = data !== "offline";

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.label === "Status"
              ? {
                  ...card,
                  value: serverIsOnline ? 101 : -1,
                  title: serverIsOnline ? "Online" : "Offline",
                  color: serverIsOnline ? "green" : "red",
                }
              : card
          )
        );

        return serverIsOnline;
      } catch (error) {
        console.error("Failed to fetch server status:", error);
        return false;
      }
    };

    const fetchCPU = async () => {
      try {
        const response = await fetch("/api/getCpu");
        const data = await response.json();
        const cpuUsage = data.cpu;

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.label === "Processor"
              ? {
                  ...card,
                  value: Math.round(cpuUsage * 100),
                  title: `${Math.round(cpuUsage * 100)}%`,
                  color:
                    cpuUsage > 0.75
                      ? "red"
                      : cpuUsage > 0.5
                      ? "orange"
                      : cpuUsage > 0.25
                      ? "yellow"
                      : "green",
                }
              : card
          )
        );
      } catch (error) {
        console.error("Failed to fetch CPU stats:", error);
      }
    };

    const fetchMemory = async () => {
      try {
        const response = await fetch("/api/getMemory");
        const data = await response.json();
        const { use, total } = data;

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.label === "Memory"
              ? {
                  ...card,
                  value: parseFloat(
                    ((parseFloat(use) / parseFloat(total)) * 100).toFixed(1)
                  ),
                  title: `${use} / ${total} GB`,
                  color:
                    parseFloat(use) / parseFloat(total) > 0.75
                      ? "red"
                      : parseFloat(use) / parseFloat(total) > 0.5
                      ? "orange"
                      : parseFloat(use) / parseFloat(total) > 0.25
                      ? "yellow"
                      : "green",
                }
              : card
          )
        );
      } catch (error) {
        console.error("Failed to fetch memory stats:", error);
      }
    };

    const fetchMinecraftStats = async () => {
      try {
        const response = await fetch("/api/getplayerServer");
        const data = await response.json();
        if (data.status === "done") {
          const { players, roundTripLatency } = data.result;

          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.label === "Ping") {
                return {
                  ...card,
                  value: roundTripLatency,
                  title: `${roundTripLatency}ms`,
                  color:
                    roundTripLatency < 100
                      ? "green"
                      : roundTripLatency < 200
                      ? "orange"
                      : "red",
                };
              } else if (card.label === "Player") {
                return {
                  ...card,
                  value: (players.online / players.max) * 100,
                  title: `${players.online} / ${players.max}`,
                  color:
                    players.online / players.max > 0.75
                      ? "red"
                      : players.online / players.max > 0.5
                      ? "orange"
                      : players.online / players.max > 0.25
                      ? "yellow"
                      : "green",
                };
              } else {
                return card;
              }
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch Minecraft stats:", error);
      }
      try {
        const response = await fetch("/api/getTimeUpServer");
        const data = await response.json();
        const timeUp = data.timeUp;

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.label === "Up time"
              ? {
                  ...card,
                  value: 101,
                  title: `${timeUp}`,
                  color: "green",
                }
              : card
          )
        );
      } catch (error) {
        console.error("Failed to fetch up time:", error);
      }
    };

    const fetchAllStats = async () => {
      const isOnline = await fetchServerStatus();

      if (isOnline) {
        await fetchMinecraftStats();
      } else {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (
              card.label === "Ping" ||
              card.label === "Player" ||
              card.label === "Up time"
            ) {
              return {
                ...card,
                value: -1,
                title: "-",
                color: "red",
              };
            } else {
              return card;
            }
          })
        );
      }

      await fetchCPU();
      await fetchMemory();
    };

    fetchAllStats();

    const interval = setInterval(() => {
      fetchAllStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative -mt-12 flex flex-wrap justify-center gap-4 px-4 sm:px-8">
        {cards.map((card, index) => (
          <CardStats
            key={index}
            value={card.value}
            label={card.label}
            title={card.title}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
}
