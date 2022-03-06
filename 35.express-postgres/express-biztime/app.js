const express = require('express');
const app = express();
const ExpressError = require('./expressError');

// Parse request bodies for JSON
app.use(express.json());

// Company routes
const compRoutes = require('./routes/companies');
app.use('/companies', compRoutes);

// Invoice routes
const invRoutes = require('./routes/invoices');
app.use('/invoices', invRoutes);

// Industry routes
const indRoutes = require('./routes/industries');
app.use('/industries', indRoutes)

// 404
app.use(function (req, res, next){
  const err = new ExpressError('Not found', 404);
  return next(err);
});

// Error handler
app.use(function (err, req, res, next){
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

module.exports = app;