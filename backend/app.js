const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');

const path = require('path');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

require('dotenv').config({path: process.cwd() + '/env/.env.dev'});

console.log(`Server ${process.env.NODE_ENV} de ${process.env.APP_NAME}`);

// Connection à la base de données MongoDB
mongoose.connect(`${process.env.MONGO_URL}`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Protection des cookies et injection de script
app.use(helmet());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'),
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'),
    next()
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Authentification user
app.use('/api/auth', userRoutes);

// Création sauces
app.use('/api/sauces', sauceRoutes);

module.exports = app;