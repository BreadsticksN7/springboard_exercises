const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const db = require('../db');
const slugify = require('slugify');

router.get('/', async(req, res, next) => {
  try {
    const results = await db.query(
      `SELECT i.i_code, i.industry, c.code, c.name 
      FROM companies AS c
      RIGHT JOIN company_industry AS ci
      ON c.code = ci.company_code
      RIGHT JOIN industries AS i
      ON ci.industry_code = i.i_code`
    );
    return res.json({ industries: results.rows })
  } catch(e) {
    return next(e);
  }
});

router.get('/:i_code', async (req, res, next) => {
  try {
    const indResults = await db.query(
      `SELECT i_code, industry
      FROM industries
      WHERE i_code = $1`,
      [req.params.i_code]
    )
    if (indResults.rows.length === 0){
        throw new ExpressError(`Industry not found`, 404);
    }
    const compResults = await db.query(
      `SELECT c.code
      FROM companies AS c
      RIGHT JOIN company_industry AS ci
      ON ci.company_code = c.code
      WHERE c.code = $1`,
      [indResults.industry]
    );
    
    const industry = indResults.rows[0];
    const companies = compResults.rows;
    industry.companies = companies.map(c => c.code);

    return res.json({ "Industry": industry});
  } catch(e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let { industry } = req.body;
    let iCode = slugify(industry, {lower: true});
    const results = await db.query(
      `INSERT INTO industries (i_code, industry)
      VALUES ($1, $2)
      RETURNING i_code, industry`,
      [iCode, industry]
    );
    return res.status(201).json({ "industry": results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.put('/:industry_code', async (req, res, next) => {
  try {
    let { industry_code, company_code } = req.body;
    const results = await db.query(
      `UPDATE company_industry
      SET industry_code = $1, company_code = $2
      WHERE industry_code = $3
      RETURNING industry_code, company_code`,
      [industry_code, company_code]
    )
    console.log(results)
    if (results.rows.length === 0){
        throw new ExpressError(`Industry not found`, 404);
    }
    return res.json({ "Company Industries": results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.delete('/:i_code', async (req, res, next) => {
  try {
    const results = await db.query(
      `DELETE FROM industries
      WHERE i_code = $1
      RETURNING i_code`,
      [req.params.i_code]
    );
    if (results.rows.length === 0){
        throw new ExpressError(`No industry found`, 404);
    }
    return res.json({ message: "Industry deleted" });
  } catch(e) {
    return next(e);
  }
});

module.exports = router;


// INSERT INTO company_industry (industry_code, company_code)
//   VALUES ('tech', 'apple'),
//          ('tech', 'ibm'),
//          ('retail', 'amazon');