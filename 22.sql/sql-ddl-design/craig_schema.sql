CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "user_name" text,
  "user_posts" int,
  "user_region" int
);

CREATE TABLE "regions" (
  "id" SERIAL PRIMARY KEY,
  "regions" text
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "categories" text
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "title" text,
  "description" text,
  "author" int,
  "region" int,
  "category" int
);

ALTER TABLE "posts" ADD FOREIGN KEY ("category") REFERENCES "categories" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("region") REFERENCES "regions" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("author") REFERENCES "users" ("id");

ALTER TABLE "regions" ADD FOREIGN KEY ("id") REFERENCES "users" ("user_region");

ALTER TABLE "posts" ADD FOREIGN KEY ("id") REFERENCES "users" ("user_posts");
