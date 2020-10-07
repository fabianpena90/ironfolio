const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
// const Projects = require("../models/Movie");

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
      console.log(authData.user, "yolo");
      User.findById(authData.user._id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// router.post("/login", passport.authenticate("local"), (req, res, next) => {
//   const { user } = req;
//   jwt.sign({ user }, "secretkey", { expiresIn: "30min" }, (err, token) => {
//     res.status(200).json({ ...user._doc, token });
//   });
// });

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
  console.log("verify");
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

// Put all movie routes below here:

router.get("/getAllMovies", (req, res) => {
  Movies.find().then((movies) => {
    console.log(movies);
    res.json({ movies });
  });
});

router.get("/getTheMovie", (req, res) => {
  Movies.findById(req.query.MovieIdFromClient).then((oneMovie) => {
    res.json({ oneMovie });
  });
  console.log(req.query.MovieIdFromClient);
});

router.post("/AddTheMovieToTheDatabase", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      console.log("Fabian Was Here");
      let movie = req.body;
      movie.userId = authData.user._id;
      Movies.create(movie).then((WereAddingAMovie) => {
        res.json({ WereAddingAMovie });
      });
    }
  });
});

router.get("/getMyMovies", verifyToken, (req, res) => {
  // console.log(req, res);
  // Movies.findById(req.query.MyMovieId).then((MyMovies) => {
  //   res.json({ MyMovies });
  // });
  // console.log(req.query.MyMovieId);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      console.log(
        authData.user._id,
        " Use this to get all movies from this user"
      );
      Movies.find({ userId: authData.user._id }).then((theirMovies) => {
        res.json({ theirMovies });
      });
    }
  });
});
module.exports = router;
