CREATE TABLE IF NOT EXISTS Server (
   id_server INTEGER PRIMARY KEY AUTOINCREMENT,
   server_name VARCHAR(30) NOT NULL UNIQUE,
   server_image BLOB,
   server_motd VARCHAR(60),
   version_name VARCHAR(10) NOT NULL,
   version VARCHAR(20) NOT NULL,
   server_memory INT NOT NULL,
   creation_time DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS statistic_server (
   id_statistic INTEGER PRIMARY KEY AUTOINCREMENT,
   server_status BOOLEAN NOT NULL,
   stats_ping INTEGER,
   player_pseudo VARCHAR(50),
   player_uuid VARCHAR(50),
   stats_number_connected INTEGER,
   server_max_player INTEGER,
   server_motd VARCHAR(60),
   time_stats DATETIME NOT NULL,
   fk_server INTEGER
);
