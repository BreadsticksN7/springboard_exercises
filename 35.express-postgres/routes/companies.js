const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const db = require('../db');
const slugify = require('slugify');

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
    const companyResults = await db.query(
      `SELECT code, name, description 
      FROM companies 
      WHERE code = $1`, 
      [req.params.code]);
    const indyResults = await db.query(
      `SELECT c.code, c.name, c.description, i.industry 
      FROM companies AS c
      RIGHT JOIN company_industry AS ci
      ON c.code = ci.company_code
      RIGHT JOIN industries AS i
      ON ci.industry_code = i.i_code
      WHERE c.code = $1`,
      [req.params.code]
    );
    if ( companyResults.rows.length === 0){
      throw new ExpressError(`There is no company with code: '${req.params.code}'`, 404);
    }
    const invoiceResults = await db.query(
      `SELECT id, amt, paid, add_date, paid_date 
      FROM invoices 
      WHERE comp_code = $1`, 
      [req.params.code]);
    
    const company = companyResults.rows[0];
    const invoices = invoiceResults.rows;
    company.invoices = invoices.map(inv => ({
      id: inv.id, 
      amt: inv.amt, 
      paid: inv.paid, 
      add_date: inv.add_date, 
      paid_date: inv.paid_date})
      );
      const industry = indyResults.rows.map(i => i.industry);
    return res.json({ "Company": company, "industries": industry});
  } catch(e) {
    return next(e);
  }
});

router.post('/', async(req, res, next) => {
  try {
    let { name, description } = req.body;
    let code = slugify(name, {lower: true});
    const results = await db.query(
      `INSERT INTO companies (code, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING code, name, description`, 
      [code, name, description]);
    return res.status(201).json({ "company": results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.put('/:code', async(req, res, next) => {
  try {
    const results = await db.query(
      `UPDATE companies 
      SET name = $2, description = $3 
      WHERE code = $1 
      RETURNING code, name, description`, 
      [req.params.code, req.body.name, req.body.description]);
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
    const results = await db.query(
      `DELETE FROM companies 
      WHERE code = $1 
      RETURNING code`, 
      [req.params.code]);
    if (results.rows.length === 0){
      throw new ExpressError(`No company with code of: '${req.params.code}'`, 404);
    }
    return res.json({ message: "Company deleted" });
  } catch(e) {
    return next(e);
  }
});

module.exports = router;