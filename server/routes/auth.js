const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Classes = require('../models/Class');
const Projects = require('../models/Projects');
const axios = require('axios');

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

const googleapi = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=';

router.post('/login', async (req, res, next) => {
  console.log('login');
  const { tokenId } = req.body;
  if (!tokenId) {
    res.status(401).json({ msg: 'Missing google JWT' });
  } else {
    let gres;
    try {
      gres = await axios.get(googleapi + encodeURI(tokenId));
    } catch (e) {
      console.error('Error when verifying user with google', e);
      res.status(500).json({ msg: 'Error validating with google' });
    }
    const { email, email_verified, picture, name, sub, error_description } =
      gres.data;

    if (!email || error_description || !email_verified) {
      res.status(401).json({ msg: 'Email not verified with google' });
    } else {
      const userData = {
        email,
        name,
        googleId: sub,
        imageUrl: picture,
      };
      let user = await User.findOne({ email });

      if (!user) {
        user = User.create(userData);
      }
      try {
        jwt.sign(
          { user },
          'secretkey',
          { expiresIn: '30min' },
          (err, token) => {
            res.status(201).json({ user, token });
          }
        );
      } catch (error) {
        res.status(500).json(err);
      }
    }
  }
});

// LogOut
router.get('/logout', (req, res, next) => {
  // req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

// Put all routes below here:
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
      User.findByIdAndUpdate(authData.user._id, {
        class: req.body.assignClass,
        classID: req.body.selectedClassId,
      })
        .then(async () => {
          await Classes.findByIdAndUpdate(req.body.selectedClassId, {
            $addToSet: { studentsID: authData.user._id },
          });
        })
        .then(() => {
          res.json({ message: 'Successfull' });
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
        classID: req.body.classID,
        studentsID: req.body.teamMembers,
        projectName: req.body.projectName,
        description: req.body.description,
        website: req.body.website,
      };
      Projects.create(project)
        .then(async (updated) => {
          req.body.teamMembers.forEach(async (member) => {
            await User.findByIdAndUpdate(member, {
              $addToSet: { projects: updated._id },
            });
          });
          await Classes.findByIdAndUpdate(req.body.classID, {
            $addToSet: { projectsID: updated._id },
          });
          res.status(200).json({ updated });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
});

// Edit project by student
router.post('/formUpdate', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      await Projects.findByIdAndUpdate(
        { _id: req.body.projectId },
        {
          $set: {
            studentsID: req.body.newTeamMembers,
            projectName: req.body.projectName,
            description: req.body.description,
            website: req.body.website,
          },
        },
        { new: true }
      )
        .then((updated) => {
          if (req.body.updatedMemberList.addedMember.length > 0) {
            req.body.updatedMemberList.addedMember.forEach(async (member) => {
              await User.findByIdAndUpdate(member, {
                $addToSet: { projects: req.body.projectId },
              });
            });
          }
          if (req.body.updatedMemberList.deletedMember.length > 0) {
            req.body.updatedMemberList.deletedMember.forEach(async (member) => {
              await User.findByIdAndUpdate(member, {
                $pull: { projects: req.body.projectId },
              });
            });
          }
          res.json({ updated });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// Get students projects from profile
router.get('/getStudentProjects', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      await User.findById(authData.user._id)
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
      ).then(() => {
        Projects.findByIdAndRemove(req.body.deleteProject).then(
          async (delProject) => {
            await Classes.findByIdAndUpdate(delProject.classID, {
              $pull: { projectsID: delProject._id },
            });
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
        .select({ name: 1, imageUrl: 1, _id: 1 })
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
