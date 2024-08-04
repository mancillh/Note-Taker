//Import Express.js
const express = require('express');

//Import PATH
const path = require('path');

const api = require('./routes/api.js');

//to read and write db
const fs = require('fs');

//Initialize instance of Express.js
const app = express();

//Specify PORT
const PORT = process.env.PORT || 3001;

//Static Middleware
app.use(express.static('public'));

// Registering middleware for body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);


//Route for viewing notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

//Route for default
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html'))
);


//Run app
app.listen (PORT, () => console.log(`APP running on PORT: ${PORT}`));