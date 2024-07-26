//Import Express.js
const express = require('express');

//Import PATH
const path = require('path');

//Initialize instance of Express.js
const app = express();

//Specify PORT
const PORT = 3001;

//Static Middleware
app.use(express.static('public'));

//Run app
app.listen (PORT, () => console.log(`APP running on PORT: ${PORT}`));