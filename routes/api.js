const router = require('express').Router()
const db = require('../db/db.json')
const fs = require('fs')
const uuid = require('../helpers/uuid');

//GET route to read the db.JSON file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile(db).then((data) => res.json(JSON.parse(data)));
  });

//POST Route for adding notes to notes page --> should receive a new note to save on the request body, add it to 
//the db.json file, and then return the new note to the client
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
      
    const { title, text } = req.body;
      
    if (title && text) {
      const newNote = {
        title,
        text,
        tip_id: uuid(),
      };
      
      readAndAppend(newNote, './db/tips.json');
      res.json(`Note added successfully`);
      } else {
        res.error('Error in adding note');
      }
    });

module.exports = router