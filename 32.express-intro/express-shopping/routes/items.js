const express = require('express');
const router = new express.Router();
const ExpressError = require('../helpers/expressError');
const items = require('../shopDB')

router.get('/', (req, res, next) => {
  try {
    return res.json({items});
  } catch (e){
    return next (e)
  }
});

router.post('/', (req, res, next) => {
  try {
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    res.status(201).json({ item: newItem })
  } catch (e){
    return next(e)
  }
});

router.get('/:name', (req, res, next) => {
  try {
    const findItem = items.find(item => item.name === req.params.name)
    if(findItem === undefined){
        throw new ExpressError('Item not found', 404)
    }
    res.json({ item: findItem })
  } catch(e){
    return next(e)
  }
});

router.patch('/:name', (req, res, next) => {
  try {
    const findItem = items.find(item => item.name === req.params.name)
    if(findItem === undefined){
        throw new ExpressError('Item not found', 404)
    }
    findItem.name = req.body.name
    findItem.price = req.body.price
    res.json({ item: findItem })
  } catch(e){
    return next(e)
  }
});

router.delete('/:name', (req, res, next) => {
  try {
    const findItem = items.findIndex(item => item.name === req.params.name)
    if(findItem === -1){
        throw new ExpressError('Item not found', 404)
    }
    items.splice(findItem, 1)
    res.json({ message: 'Item deleted' })
  } catch(e){
      return next(e)
  }
});

module.exports = router;