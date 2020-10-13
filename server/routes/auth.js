const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
const Classes = require("../models/Class");
const Projects = require("../models/Projects");

router.post("/signup", (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => {
      jwt.sign({ user }, "secretkey", { expiresIn: "30min" }, (err, token) => {
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

router.get("/user", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // res.status(200).json(authData.user)
      //console.log(authData.user, "Fabian & Rabiul built this :)");
      User.findById(authData.user._id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const { user } = req;
  jwt.sign({ user }, "secretkey", { expiresIn: "30min" }, (err, token) => {
    res.status(200).json({ ...user._doc, token });
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "Logged out" });
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

// Verify Token
function verifyToken(req, res, next) {
  //console.log("verify");
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
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

// Put all routes below here:

router.get("/getAllClasses", (req, res) => {
  Classes.find().then((selectClass) => {
    //console.log(selectClass, "Fabian & Rabiul built this");
    res.json({ selectClass });
  });
});

// router.get("/getStudentProjects", (req, res) => {
//   User.findById(req.query.MovieIdFromClient).then((oneMovie) => {
//     res.json({ oneMovie });
//   });
//   console.log(req.query.MovieIdFromClient);
// });

router.post("/addClass", verifyToken, (req, res) => {
  // console.log("From Line 95: ", req.body);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    // console.log("From Line 97: ", authData);
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

router.post("/newProject", verifyToken, (req, res) => {
  // console.log("From Line 118: ", req.body);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    // console.log("From Line 120: ", authData.user);
    if (err) {
      res.status(403).json(err);
    } else {
      //let project = req.body.project;
      let project = new Projects(req.body);
      project.studentsID = authData.user._id;
      project.save().then((newProject) => {
        User.findByIdAndUpdate(
          authData.user._id,
          {
            $push: { projects: newProject._id },
          },
          { new: true }
        ).then((project) => {
          // console.log("Fabian & Rabiul are the shit");
          res.json({ project });
        });
      });
    }
  });
});

router.post("/formUpdate", verifyToken, (req, res) => {
  console.log("From Line 118: ", req.body);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    // console.log("From Line 120: ", authData.user);
    if (err) {
      res.status(403).json(err);
    } else {
      //let project = req.body.project;
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
        console.log(typeof req.body.teamMembers, "Fabian & Rabiul built this with love to all our students")
        req.body.teamMembers.forEach((member) => {
          console.log(member, "line 164")
          User.findByIdAndUpdate(member, {$addToSet:{projects: req.body.projectId}})
        .then((response)=>{
          console.log(response, "165 Hello from the backend")
          res.json({ updated });
        }).catch((err)=>{console.log(err, "If you see this is because the code broke")})
        console.log(updated, "line 159");
      })
      });
    }
  });
});

router.get("/getStudentProjects", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .populate("projects")
        .then((allProjects) => {
          // console.log(a, "Testttsdsdadasdasdasdadadad");
          res.json({ allProjects });
        });
      // Projects.find()
      //   .populate("studentsID")
      //   .then((projects) => {
      //     res.json({ projects });
      //   });
    }
  });
});

router.post("/getAllClassProjects", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.find(req.body)
        .populate("projects")
        .then((allProjects) => {
          console.log(allProjects);
          res.json({ allProjects });
        });
      
    }
  });
});

router.post("/deleteProject", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      //console.log(req.body.deleteProject);
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
        //res.json({ delProject });
      });
    }
  });
});

router.post("/editProject", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Projects.findByIdAndRemove(req.body.deleteProject).then((delProject) => {
        res.json({ delProject });
      });
    }
  });
});

router.post("/getStudentList", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.find(req.body).then((nameList) => {
        res.json({ nameList });
      });
    }
  });
});

router.post("/getEditProject", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      //console.log(req.body, "get that shit!!!!!!!!!!!!!!!!!!1")
      Projects.findById(req.body.projectId).then((valueField) => {
        // console.log(valueField, "something somethinggggggg")
        res.json({ valueField });
      });
    }
  });
});

router.post("/deleteFavorites", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
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
        // .populate("favorites")
        // .populate("studentsID")
        .populate({ path: "favorites", populate: { path: "studentsID" } })
        .then((delFavorites) => {
          res.json({ delFavorites });
        });
    }
  });
});

router.post("/deleteFavoritesArchive", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(
        authData.user._id,
        {
          $pull: { favorites: req.body.targetProject },
        },
        { new: true }
      ).then((delFavorites) => {
        res.json({ delFavorites });
      });
    }
  });
});

router.post("/addFavorites", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      if (req.body.targetProject != "null") {
        User.findByIdAndUpdate(
          authData.user._id,
          {
            $push: { favorites: req.body.targetProject },
          },

          { new: true }
        ).then((addFavorites) => {
          res.json({ addFavorites });
        });
      }
    }
  });
});

router.post("/getAllFavoriteProjects", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // console.log(req.body);
      Projects.find()
        .where("_id")
        .in(req.body.favorites)
        .populate("studentsID")
        .then((allProjects) => {
          res.json({ allProjects });
          // allProjects.map((eachProject) => {
          //   User.find()
          //     .where("_id")
          //     .in(eachProject.studentsID)
          //     .then((students) => {
          //       console.log(students, allProjects, "<<<<<<<<<<<<<<<<<<<<<<<<");
          //       res.json({ students, allProjects });
          //     });
          // });
        });
    }
  });
});

module.exports = router;
