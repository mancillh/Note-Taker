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

//Route for default
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '../../index.html'))
);

//Route for notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../../notes.html'))
);

//Run app
app.listen (PORT, () => console.log(`APP running on PORT: ${PORT}`));