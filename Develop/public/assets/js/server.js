//Import Express.js
const express = require('express');

//Import PATH
const path = require('path');

//to read and write db
const fs = require('fs');

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

//Route for viewing notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../../notes.html'))
);

//Route for posting to notes page
app.post('/notes', (req, res) => {
   
 // Log that a POST request was received
 console.info(`${req.method} request received to add a note`);

 // Destructuring assignment for the items in req.body
 const { title, text } = req.body;

 // If all the required properties are present
 if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };

    // Obtain existing reviews
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) {
       console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
         '../db/db.json',
         JSON.stringify(parsedNotes, null, 4),
         (writeErr) =>
           writeErr
             ? console.error(writeErr)
             : console.info('Successfully updated notes list!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

//Run app
app.listen (PORT, () => console.log(`APP running on PORT: ${PORT}`));