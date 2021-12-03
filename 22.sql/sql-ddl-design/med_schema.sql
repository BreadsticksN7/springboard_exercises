CREATE TABLE "doctors" (
  "id" SERIAL PRIMARY KEY,
  "full_name" text,
  "office_loc" text,
  "office_phone" int
);

CREATE TABLE "patients" (
  "id" SERIAL PRIMARY KEY,
  "first_name" text,
  "last_name" text,
  "phone_num" int
);

CREATE TABLE "diseases" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "descript" text
);

CREATE TABLE "medical_center" (
  "id" SERIAL PRIMARY KEY,
  "staff_name" int
);

CREATE TABLE "diagnosis" (
  "id" SERIAL PRIMARY KEY,
  "patient_id" int,
  "doctor_id" int,
  "disease_id" int,
  "visit_date" int,
  "comment" text
);

ALTER TABLE "medical_center" ADD FOREIGN KEY ("staff_name") REFERENCES "doctors" ("id");

ALTER TABLE "diagnosis" ADD FOREIGN KEY ("disease_id") REFERENCES "diseases" ("id");

ALTER TABLE "diagnosis" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("id");

ALTER TABLE "diagnosis" ADD FOREIGN KEY ("doctor_id") REFERENCES "doctors" ("id");
