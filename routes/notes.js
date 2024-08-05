const notes = require('express').Router()
const uuid = require('./helpers/uuid');
const db = require('./db/db.json')

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile } = require('./helpers/fsUtils');

//GET route to read the db.JSON file and return all saved notes as JSON
notes.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//POST Route for adding notes to notes page --> should receive a new note to save on the request body, add it to 
//the db.json file, and then return the new note to the client
notes.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const db = JSON.parse(readFromFile('./db/db.json'))
    //readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      note_id: uuid(),
    };
     
    db.push(newNote);
    writeToFile('./db/db.json', JSON.stringify(db));
    res.json(db);
    });

module.exports = notes; 