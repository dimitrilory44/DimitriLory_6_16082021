const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config({path: process.cwd() + '/env/.env.dev'});

// Connection à la base de données MongoDB
mongoose.connect(`${process.env.MONGO_URL}`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

module.exports = app;