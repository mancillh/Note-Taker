const notes = require('express').Router()
const uuid = require('../helpers/uuid.js');
const db = require('../db/db.json')

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile } = require('../helpers/fsUtils');

let data = db;

//GET Route to read the db.JSON file and return all saved notes as JSON
  notes.get ('/', (req, res) => {
    console.info(`${req.method} request received to view notes`);
    readFromFile('../Note Taker/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        res.json(JSON.parse(data));
      }
    })
  });

//POST Route for adding notes to notes page --> should receive a new note to save on the request body, add it to 
//the db.json file, and then return the new note to the client
  notes.post ('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      // Obtain existing notes
      readFromFile('../Note Taker/db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new review
          parsedNotes.push(newNote);
  
          // Write updated reviews back to the file
          writeToFile(
            '../Note Taker/db/db.json',
            parsedNotes, null, 4,
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(data);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

module.exports = notes; 