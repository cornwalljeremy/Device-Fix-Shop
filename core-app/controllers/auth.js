const router = require('express').Router();
const passport = require('passport');

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
