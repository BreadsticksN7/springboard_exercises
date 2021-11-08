DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;
\c medical_center

CREATE TABLE diseases
(
    id SERIAL PRIMARY KEY,
    fullname TEXT,
    symptoms TEXT
);

CREATE TABLE doctors
(
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    office_location TEXT NOT NULL,
    office_phone TEXT
);

CREATE TABLE medcenter
(
    id SERIAL PRIMARY KEY,
    staff_list INT REFERENCES doctors(id)
);

CREATE TABLE patients
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    patient_number TEXT NOT NULL,
    doc1 INT REFERENCES doctors(id),
    doc2 INT REFERENCES doctors(id),
    doc3 INT REFERENCES doctors(id),
    diag1 INT REFERENCES diseases(id),
    diag2 INT REFERENCES diseases(id),
    diag3 INT REFERENCES diseases(id)
);

INSERT INTO diseases
(fullname, symptoms)
VALUES
('Cold', 'Coughing, sneezing, and running nose'),
('Death', 'Dead');

INSERT INTO doctors
(full_name, office_location, office_phone)
VALUES
('Chris Johnson', 'Room 301', '867-5309'),
('Steve Stevenson', 'Room 104', '867-5307');

INSERT INTO patients
(first_name, last_name, patient_number, doc1, doc2, diag1)
VALUES
('Bob', 'Simpson', '555-6666', 1, 2, 1);

INSERT INTO medcenter
(staff_list) VALUES (1);
INSERT INTO medcenter
(staff_list) VALUES (2);

-- https://docs.google.com/spreadsheets/d/1NMAMXjSPZra3czMGfvcnvL8JEBl2BG-oxMqHnCCdcLY/edit?usp=sharing

-- SELECT doctors.id, full_name, office_location, office_phone FROM medcenter INNER JOIN doctors ON (medcenter.staff_list = doctors.id);