const express = require("express");
const Book = require("../models/book");
const jsonschema = require('jsonschema');
const ExpressError = require('../expressError');

const bookSchemaNew = require('../schemas/bookSchemaNew.json');
const bookSchemaUpdate = require('../schemas/bookSchemaUpdate.json')
const { update } = require("../models/book");

const router = new express.Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.isbn);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    const results = jsonschema.validate(req.body, bookSchemaNew);
    if(!results.valid){
      let listErrors = results.errors.map(err => err.stack);
      return next({ status: 400, listErrors});
    }
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (error) {
    return next(error);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    if ('isbn' in req.body){
      return next({ status: 400, message: "Can't update ISBN" });
    }
    const updateBook = jsonschema.validate(req.body, bookSchemaUpdate);
    if(!updateBook.valid){
      let listErrors = updateBook.errors.map(err => err.stack);
      return next({ status: 400, listErrors});
    }
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
