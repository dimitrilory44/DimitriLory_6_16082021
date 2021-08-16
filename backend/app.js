const mongoose = require('mongoose');
const express = require('express');

// Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://admin:superadmin@cluster0.g7e54.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

module.exports = app;