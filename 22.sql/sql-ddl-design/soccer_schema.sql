CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "players" int
);

CREATE TABLE "players" (
  "id" SERIAL PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE "referee" (
  "id" SERIAL PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE "matches" (
  "id" SERIAL PRIMARY KEY,
  "team1" int,
  "team2" int,
  "referee" int,
  "match_date" int,
  "winner" int
);

CREATE TABLE "goals" (
  "id" SERIAL PRIMARY KEY,
  "player" int,
  "match" int
);

ALTER TABLE "players" ADD FOREIGN KEY ("id") REFERENCES "teams" ("players");

ALTER TABLE "matches" ADD FOREIGN KEY ("team1") REFERENCES "teams" ("id");

ALTER TABLE "matches" ADD FOREIGN KEY ("team2") REFERENCES "teams" ("id");

ALTER TABLE "matches" ADD FOREIGN KEY ("referee") REFERENCES "referee" ("id");

ALTER TABLE "matches" ADD FOREIGN KEY ("winner") REFERENCES "teams" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("match") REFERENCES "matches" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("player") REFERENCES "players" ("id");
