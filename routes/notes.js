const notes = require('express').Router()
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//GET route to read the db.JSON file and return all saved notes as JSON
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//POST Route for adding notes to notes page --> should receive a new note to save on the request body, add it to 
//the db.json file, and then return the new note to the client
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
      
    const { title, text } = req.body;
      
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
      
      readAndAppend(newNote, '../db/db.json');
      res.json(`Note added successfully`);
      } else {
        res.error('Error in adding note');
      }
    });

module.exports = notes;