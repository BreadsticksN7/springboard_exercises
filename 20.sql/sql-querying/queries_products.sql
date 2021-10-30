-- Comments in SQL Start with dash-dash --
--Add product to table
INSERT INTO products(name, price, can_be_returned) VALUES ('chair', '44.00', 'false');

--Add product to table
INSERT INTO products(name, price, can_be_returned) VALUES ('stool', '25.99', 'true');

--Add product to table
INSERT INTO products(name, price, can_be_returned) VALUES ('table', '124.00', 'false');

--Display all rows and tables
SELECT * FROM products;

--Display all names of products
SELECT name FROM products;

--Display all names and prices of products
SELECT name, price FROM products;

--Add new product
INSERT INTO products(name, price, can_be_returned) VALUES ('metroid', '59.99', 'true');

--Display products that can_be_returned
SELECT name FROM products WHERE can_be_returned = true;

--Display products < 44.00
SELECT name FROM products WHERE price < 44.00;

--Display products between 22.50 and 99.99
SELECT name FROM products WHERE price > 22.50 AND price < 99.99;

--Update product list: 20$ off
UPDATE products SET price = (price - 20);

--Everything under 25$ is sold out - remove all who match
DELETE FROM products WHERE price < 25;

--Sales over, prices up 20$
UPDATE products SET price = (price + 20);

--All things are now returnable
UPDATE products SET can_be_returned = 'true' WHERE can_be_returned = 'false';