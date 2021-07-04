const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const Classes = require('../models/Class');
const Projects = require('../models/Projects');
const chalk = require('chalk');
const io = require('socket.io')(server, {
  cors: {
    origin: ['https://iron-folio.netlify.app', 'http://localhost:3000'],
  },
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403); //.json({err:'not logged in'});
  }
}

//Socket Connection
let userList = {};

io.on('connection', (socket) => {
  console.log('connection');
  let userId;
  socket.on('user', ({ id, name, imageUrl }) => {
    userId = id;
    userList[id] = [name, imageUrl];
    io.emit('users', userList);
  });
  socket.on('disconnect', () => {
    delete userList[userId];
    if (userList) io.emit('users', userList);
  });
});

// SignUp
router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => {
      jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
        req.login(user, function (err, result) {
          res.status(201).json({ ...user._doc, token });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/user', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// LogIn
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
    res.status(200).json({ ...user._doc, token });
  });
});

// LogOut
router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

// Put all routes below here:

// Get Classes from profile page
router.get('/getAllClasses', (req, res) => {
  Classes.find()
    .lean()
    .sort({ createdAt: -1 })
    .then((selectClass) => {
      res.json({ selectClass });
    });
});

// Create a class (only admin)
router.post('/createClass', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let newClass = new Classes(req.body);
      newClass.save().then((classCohort) => {
        res.json({ classCohort });
      });
    }
  });
});

// Add class by student
router.post('/addClass', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(
        authData.user._id,
        { class: req.body.assignClass },
        { new: true }
      ).then((user) => {
        res.json({ user });
      });
    }
  });
});

// New project by student
router.post('/newProject', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let project = {
        class: req.body.class,
        studentsID: req.body.teamMembers,
        projectName: req.body.projectName,
        description: req.body.description,
        website: req.body.website,
      };
      Projects.create(project).then((updated) => {
        req.body.teamMembers.forEach((member) => {
          User.findByIdAndUpdate(member, {
            $addToSet: { projects: updated._id },
          })
            .then((response) => {
              res.status(200).json({ updated });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      });
    }
  });
});

// Edit project by student
router.post('/formUpdate', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.findByIdAndUpdate(
        { _id: req.body.projectId },
        {
          $set: {
            studentsID: req.body.teamMembers,
            projectName: req.body.projectName,
            description: req.body.description,
            website: req.body.website,
          },
        },
        { multi: true }
      ).then((updated) => {
        req.body.teamMembers.forEach((member) => {
          User.findByIdAndUpdate(member, {
            $addToSet: { projects: req.body.projectId },
          })
            .then((response) => {
              res.json({ updated });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  });
});

// Get students projects from profile
router.get('/getStudentProjects', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .lean()
        .populate('projects')
        .then((allProjects) => {
          res.json({ allProjects });
        });
    }
  });
});

// Get all projects from archive detail
router.post('/getAllClassProjects', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.find({ class: req.body.class })
        .lean()
        .sort({ createdAt: -1 })
        .populate('studentsID')
        .then((allProjects) => {
          res.json({ allProjects });
        });
    }
  });
});

// Delete project from student profile
router.post('/deleteProject', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $pull: { projects: req.body.deleteProject },
        },

        { new: true }
      ).then((delProject) => {
        Projects.findByIdAndRemove(req.body.deleteProject).then(
          (delProject) => {
            res.json({ delProject });
          }
        );
      });
    }
  });
});

// Submit edit project from form update
router.post('/editProject', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.findByIdAndRemove(req.body.deleteProject).then((delProject) => {
        res.json({ delProject });
      });
    }
  });
});

// Add students to projects from form update
router.post('/getStudentList', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.find(req.body)
        .lean()
        .then((nameList) => {
          res.json({ nameList });
        });
    }
  });
});

// Details of edited projects
router.post('/getEditProject', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.findById(req.body.projectId)
        .lean()
        .then((valueField) => {
          res.json({ valueField });
        });
    }
  });
});

// Delete favorites from student favorites
router.post('/deleteFavorites', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $pull: { favorites: req.body.targetProject },
        },
        { new: true }
      )
        .populate({ path: 'favorites', populate: { path: 'studentsID' } })
        .then((delFavorites) => {
          res.json({ delFavorites });
        });
    }
  });
});

// Delete favorite projects from student archive
router.post('/deleteFavoritesArchive', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $pull: { favorites: req.body.targetProject },
        },
        { new: true }
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// Add favorite projects
router.post('/addFavorites', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $push: { favorites: req.body.targetProject },
        },

        { new: true }
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// See all favorite projects
router.post('/getAllFavoriteProjects', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.find()
        .lean()
        .where('_id')
        .in(req.body.favorites)
        .populate('studentsID')
        .then((allProjects) => {
          res.json({ allProjects });
        });
    }
  });
});

// Get favorites projects from archive details
router.get('/getFavProjects', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// Get favorite projects of student
router.get('/favoriteSection', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .lean()
        .populate({ path: 'favorites', populate: { path: 'studentsID' } })
        .populate('projects')
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

module.exports = router;
