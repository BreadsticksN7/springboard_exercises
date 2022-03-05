DROP DATABASE IF EXISTS biztime;
CREATE DATABASE biztime;

\c biztime;

-- DROP TABLE IF EXISTS invoices;
-- DROP TABLE IF EXISTS companies;
-- DROP TABLE IF EXISTS industries;
-- DROP TABLE IF EXISTS company_industry;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
    i_code TEXT PRIMARY KEY,
    industry TEXT NOT NULL UNIQUE
);

CREATE TABLE company_industry (
    id serial PRIMARY KEY,
    industry_code TEXT NOT NULL REFERENCES industries(i_code) ON DELETE CASCADE,
    company_code TEXT NOT NULL REFERENCES companies(code) ON DELETE CASCADE
);

INSERT INTO companies (code, name, description)
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.'),
         ('amazon', 'Amazon', 'Online Retail');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries (i_code, industry)
  VALUES ('retail', 'Retail'),
         ('tech', 'Tech');

INSERT INTO company_industry (industry_code, company_code)
  VALUES ('tech', 'apple'),
         ('tech', 'ibm'),
         ('retail', 'amazon');