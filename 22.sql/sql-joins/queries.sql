-- write your queries here
-- first query
SELECT *
FROM owners
FULL JOIN vehicles
ON vehicles.owner_id = owners.id;


--second query
SELECT first_name, last_name, COUNT(owner_id)
FROM owners JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY (first_name, last_name)
ORDER BY first_name;


--third query
SELECT first_name, last_name, ROUND(AVG(price)) as avg_price, COUNT(owner_id)
FROM owners JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY (first_name, last_name)
HAVING COUNT(owner_id) > 1 and ROUND(AVG(price)) > 10000
ORDER BY first_name DESC;