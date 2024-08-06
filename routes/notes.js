const notes = require('express').Router()
const uuid = require('../helpers/uuid.js');
const db = require('../db/db.json')

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile } = require('../helpers/fsUtils');

let data = db;

//GET Route to read the db.JSON file and return all saved notes as JSON
  notes.get ('/notes', (req, res) => {
    res.json(data);
  });

//POST Route for adding notes to notes page --> should receive a new note to save on the request body, add it to 
//the db.json file, and then return the new note to the client
  notes.post ('/notes', (req, res) => {
    readFromFile(db, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });
    
    let newNote = req.body;
    newNote.note_id = uuid();

    data.push(newNote);

    writeToFile(db, function (err) {

      if (err) {
          return console.log(err);
      }
      console.log("Your note was saved!");
    });
  
    res.json(data);
  });

module.exports = notes; 