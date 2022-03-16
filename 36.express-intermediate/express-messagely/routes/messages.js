const express = require('express');
const router = new express.Router();

const Message = require('../models/message');
const ExpressError = require('../expressError');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth')


router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username;
    const message = await Message.get(req.params.id);
    if(message.to_username !== username && message.from_user.username !== username){
      throw new ExpressError("Not allowed to read message", 401)
    }
    return res.json({message});
  }catch(e) {
   return next(e);
  }
});


router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const { from_username, to_username, body } = await Message.create(req.body);
    return res.json({from_username, to_username, body});
  }catch(e) {
   return next(e);
  }
});


router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username;
    const message = await Message.get(req.params.id);
    if(message.to_user.username !== username){
      throw new ExpressError("Unable to mark message as 'Read'", 401);
    }
    const timestamp = await Message.markRead(req.params.id);
    return res.json({timestamp});
  }catch(e) {
    return next(e);
  }
});

module.exports = router;