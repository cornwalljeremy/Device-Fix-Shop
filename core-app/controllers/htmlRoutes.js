const router = require('express').Router();
const path = require('path');

router.get('/admin', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
  }
  else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  }
  else {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }
});

router.get('/tracking/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/tracking.html'));
});

module.exports = router;
