const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const db = require('../db');

router.get('/', async(req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({ invoices: results.rows })
  } catch(e) {
    return next(e);
  }
});

router.get('/:id', async(req, res, next) => {
  try {
    const results = await db.query(`SELECT id, comp_code, amt, paid, add_date, paid_date, companies.name, companies.description FROM invoices INNER JOIN companies ON invoices.comp_code = companies.code WHERE id = $1`, [req.params.id]);
    if (results.rows.length === 0){
        throw new ExpressError(`Invoice not found: '${req.params.id}'`, 404)
    }
    const data = results.rows[0];
    const invoice = {
        id: data.id,
        company: { code: data.comp_code, name: data.name, description: data.description },
        amt: data.amt,
        paid: data.paid,
        add_date: data.add_date,
        paid_date: data.paid_date
    };
    return res.json({ "Invoice": invoice})
  } catch(e) {
    return next(e);
  }
});

router.post('/', async(req, res, next) => {
  try {
    const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, [req.body.comp_code, req.body.amt]);
    return res.status(201).json({ invoice: results.rows[0] })
  } catch(e) {
    return next(e);
  }
});

router.put('/:id', async(req, res, next) => {
  try {
    const results = await db.query(`UPDATE invoices SET amt = $2 WHERE id = $1 RETURNING id, comp_code, amt, paid, add_date, paid_date`, [req.params.id, req.body.amt]);
    if (results.rows.length === 0){
      throw new ExpressError(`Invoice can't be found`, 404);
    }
    return res.json({ invoice: results.rows[0]});
  } catch(e) {
  return next(e)
  }
});

router.delete('/:id', async(req, res, next) => {
  try {
    const results = await db.query(`DELETE FROM invoices WHERE id = $1 RETURNING id`, [req.params.id]);
    if (results.rows.length === 0){
      throw new ExpressError(`No invoice with ID of: '${req.params.id}'`, 404);
    }
    return res.json({ message: "Invoice deleted" });
    } catch(e) {
    return next(e);
  }
});


module.exports = router;