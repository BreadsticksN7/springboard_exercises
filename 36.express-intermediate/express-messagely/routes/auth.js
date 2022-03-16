const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');

const ExpressError = require('../expressError');
const User = require('../models/user');
const { SECRET_KEY } = require('../config');

router.get('/register', (req, res, next) => {
  res.send("APP IS WORKING")
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone} = User.register(req.body);
    const token = jwt.sign({username}, SECRET_KEY);
    return res.json({token});
  } catch(e) {
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password} = req.body;
    if(await User.authenticate(username,password)){
      const token = jwt.sign({username}, SECRET_KEY);
      User.updateLoginTimestamp(username);
      return res.json({token});
    } else {
      throw new ExpressError('Invalid Username/Password', 400);
    }
  } catch (e){
    return next(e);
  }
});


module.exports = router;