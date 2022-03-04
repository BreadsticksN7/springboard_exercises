const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const db = require('../db');

router.get('/', async(req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM companies`);
    return res.json({ companies: results.rows })
  } catch(e) {
    return next(e);
  }
});

router.get('/:code', async(req, res, next) => {
  try {
    const companyResults = await db.query(`SELECT code, name, description FROM companies WHERE code = $1`, [req.params.code]);
    if ( companyResults.rows.length === 0){
      throw new ExpressError(`There is no company with code: '${req.params.code}'`, 404);
    }
    const invoiceResults = await db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [req.params.code])
    const company = companyResults.rows[0];
    const invoices = invoiceResults.rows;
    company.invoices = invoices.map(inv => ({
      id: inv.id, 
      amt: inv.amt, 
      paid: inv.paid, 
      add_date: inv.add_date, 
      paid_date: inv.paid_date})
      );
    return res.json({ "Company": company});
  } catch(e) {
    return next(e);
  }
});

router.post('/', async(req, res, next) => {
  try {
    const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [req.body.code, req.body.name, req.body.description]);
    return res.status(201).json({ company: results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.put('/:code', async(req, res, next) => {
  try {
    const results = await db.query(`UPDATE companies SET name = $2, description = $3 WHERE code = $1 RETURNING code, name, description`, [req.params.code, req.body.name, req.body.description]);
    if (results.rows.length === 0){
      throw new ExpressError(`Company not found`, 404);
    }
    return res.json({ company: results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.delete('/:code', async(req, res, next) => {
  try {
    const results = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code`, [req.params.code]);
    if (results.rows.length === 0){
      throw new ExpressError(`No company with code of: '${req.params.code}'`, 404);
    }
    return res.json({ message: "Company deleted" });
  } catch(e) {
    return next(e);
  }
});

module.exports = router;
