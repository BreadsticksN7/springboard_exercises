-- Comments in SQL Start with dash-dash --
--From app ID 1880
SELECT app_name FROM analytics WHERE id = 1880;

--Find ID and app name last updated Aug 1, 2018
SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';

--Count the number of apps in each cat
SELECT category,COUNT(category) FROM analytics GROUP BY category;

--Top 5 most reviews and the number
SELECT app_name, reviews FROM analytics ORDER BY reviews desc limit 5;

--Most reviews with rating greater 4.8
SELECT app_name, rating FROM analytics WHERE rating >= 4.8 ORDER BY rating desc;

--Avg rating for each cat highest to lowest
SELECT category, AVG(rating) FROM analytics GROUP BY category ORDER BY avg desc;

--Find name, price and rating of most expensive app with rating < 3
app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price desc LIMIT 1;

--Find all records w/ min install of 50 w/ a rating order by highest
SELECT * FROM analytics WHERE min_installs <= 50 AND rating IS NOT NULL ORDER BY rating desc;

--All apps rated 3 or less with 1k reviews
SELECT app_name FROM analytics WHERE rating < 3 AND reviews >= 1000;

--Find top 10 apps between .10 and 1.00
SELECT * FROM analytics WHERE price BETWEEN 0.1 and 1 ORDER BY reviews desc LIMIT 10;

--Find out of date app
SELECT * FROM analytics ORDER BY last_updated LIMIT 1;

--Find most expensive app
SELECT * FROM analytics ORDER BY price desc LIMIT 1;

--Count all reviews
SELECT SUM(reviews) FROM analytics;

--Find all cat with 300+ apps
SELECT category FROM analytics GROUP BY category HAVING COUNT(*) > 300;

--Find app with highest proportion of min_installs to reviews installed at least 100k.  Display with name, reviews, installs and proportion
SELECT app_name, reviews, min_installs, min_installs/reviews AS proportion FROM analytics WHERE min_installs
 >= 100000 ORDER BY proportion desc LIMIT 1;