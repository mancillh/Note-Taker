const notes = require('express').Router()
const uuid = require('../helpers/uuid.js');
const db = require('../db/db.json')

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile } = require('../helpers/fsUtils');

let data = db;

//GET Route to read the db.JSON file and return all saved notes as JSON
notes.get('/', (req, res) => {
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

//POST Route for adding notes to notes page --> receives a new note to save on the request body, adds it to 
//the db.json file, and then return the new note to the client
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the note object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Obtain existing notes
    readFromFile('../Note Taker/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
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

// Delete Route
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to delete note`);

  //reads notes in db.json
  readFromFile('../Note Taker/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      let parsedNotes = JSON.parse(data);
      //filters notes for anything that does not match the chosen id and populates only those notes thus 
      //removing note with chosen id
      const { id } = req.params;
      const notesLessOne = parsedNotes.filter(newNote => newNote.id != id);
    // updates db.json with one index removed"
    writeToFile('../Note Taker/db/db.json', notesLessOne, null, 4,
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : res.json(notesLessOne) 
          )
        }
    })
    //rewrites page with deleted item now erased
    readFromFile('../Note Taker/db/db.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        await res.json(JSON.parse(data));
        console.info("Note successfully deleted")
      }
    });
  });

module.exports = notes; 