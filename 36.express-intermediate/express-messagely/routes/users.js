const express = require('express');
const router = new express.Router();

const ExpressError = require('../expressError');
const User = require('../models/user');
const Message = require('../models/message');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth')


router.get('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const users = await User.all();
    return res.json({users});
  } catch(e) {
    return next(e);
  }
});

router.get('/:username', ensureCorrectUser, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({user});
  } catch(e) {
    return next(e);
  }
});

router.get('/:username/to', ensureCorrectUser, async (req, res, next) => {
  try {
    const messages = await User.messagesTo(req.params.username);
    return res.json({messages});
  }catch(e) {
    return next(e);
  }
});

router.get('/:username/from', ensureCorrectUser, async (req, res, next) => {
  try {
    const messages = await User.messagesFrom(req.params.username);
    return res.json({messages});
  }catch(e) {
    return next(e);
  }
});

module.exports = router;