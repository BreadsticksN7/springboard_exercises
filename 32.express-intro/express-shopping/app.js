const express = require('express')
const app = express();
const itemRoutes = require('./routes/items')
const ExpressError = require('./helpers/expressError')

app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));


app.use('/items', itemRoutes);


app.use((req, res, next) => {
    return new ExpressError('Not found', 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });
  
  module.exports = app;