var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport');

/* HOME PAGE */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* SIGN UP PAGE*/
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.redirect('login');
      } else {
        res.send('This user already exists');
      }
    });
});

/* LOGIN PAGE*/
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res, next) {
    if (req.user.Admin) {
      res.redirect('dashboard');
    } else {
      if (req.user.Deleted) {
        res.redirect('signup');
      }
      res.redirect('profile');
    }
  });


/* USER PROFILE PAGE*/
router.get('/profile', function (req, res, next) {
  let userId = parseInt(req.user.UserId);
  if (req.user) {
    models.users.findAll({
      where: {
        UserId: userId
      }
    })
      .then(usersFound => {
        res.render('profile', {
          FirstName: req.user.FirstName,
          LastName: req.user.LastName,
          Email: req.user.Email,
          UserId: req.user.UserId,
          Username: req.user.Username,
          users: usersFound
        });

      });
  };
});

/* ADMIN DASHBOARD PAGE*/
router.get('/dashboard', function (req, res, next) {
  
  if (req.user.Admin) {
    models.users.findAll({
      where: {
        Admin: false,
        Deleted: false
      }
    })
      .then(usersFound => {
        res.render('dashboard', {
          FirstName: req.user.FirstName,
          LastName: req.user.LastName,
          Email: req.user.Email,
          UserId: req.user.UserId,
          Username: req.user.Username,
          Admin: req.user.Admin,
          users: usersFound
        });
      });
  } else {
  }
});

/////////* ADMIN VIEW USER */////////
router.get('/viewUser/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);
  if (req.user.Admin) {
    models.users.findAll({
      where: {
        UserId: userId,
        Admin: false,
        Deleted: false,
      }
    })
      .then(usersFound => {
        res.render('viewUser', {
          FirstName: req.user.FirstName,
          LastName: req.user.LastName,
          Email: req.user.Email,
          UserId: req.user.UserId,
          Username: req.user.Username,
          Admin: req.user.Admin,
          users: usersFound,
          
        });
      });
  } else {
    res.render('unauthorized');
  }
});


/////////* DELETE USER *//////////
router.post('/viewUser/:id', function (req, res, next) {
  let userDeleteId = parseInt(req.params.id);
  models.users.update(
    {
      Deleted: 'true'
    },
    {
      where: {
        UserId: userDeleteId
      }
    }
  )
    .then(res.redirect('/users/dashboard'));
    });

module.exports = router;