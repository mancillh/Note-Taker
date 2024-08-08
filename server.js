//Import Express.js
const express = require('express');

//Import PATH
const path = require('node:path');

const api = require('./routes/index.js');

//Initialize instance of Express.js
const app = express();

//Specify PORT
const PORT = process.env.PORT || 3001;

//Static Middleware
app.use(express.static('public'));

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

console.log(__dirname);
// GET Route for landing page with link to notes page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET Route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

//GET Route for default to landing page if user types in something unexpected after /
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html'))
);

//Run app
app.listen (PORT, () => console.log(`APP running on PORT: ${PORT}`));