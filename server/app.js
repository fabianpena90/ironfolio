require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/ironfolioExample';
console.log('Connecting DB to ', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://iron-folio.netlify.app'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const index = require('./routes/index');
const auth = require('./routes/auth');

app.use('/api', index);
app.use('/api', auth);

app.get('*', (req, res, next) => {
  console.log('weird', req.headers.host, 'peach', req.url);

  if (req.headers.host.includes('heroku')) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  } else {
    next();
  }
});

module.exports = app;
