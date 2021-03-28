const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

module.exports = router;

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); 

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    console.log("Here")
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

module.exports = router;


router.post(
    '/login',
    async (req, res, next) => {
      console.log("Here again")
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );
  
  module.exports = router;