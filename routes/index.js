const express = require('express');
const router = express.Router();

// - INDEX 
router.get('/', (req, res) => {
  const name = req.cookies.username;
  // if the name doesn't exist in the cookie redirect user
  if(name){
    res.render('index', { name });
  } else {
    res.redirect('/login');
  }
});

// - LOGOUT
router.post('/bye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/login');
});

// - LOGIN
router.get('/login', (req, res) => {
  const name = req.cookies.username;
  if(name){
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.post('/login', (req, res) => {
  // add cookie
  res.cookie('username', req.body.username );
  res.redirect('/');
});

module.exports = router;