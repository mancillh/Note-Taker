const notes = require('express').Router()
const uuid = require('../helpers/uuid.js');
const db = require('../db/db.json');
const { join } = require('path')

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile } = require('../helpers/fsUtils');

let data = db;

//GET Route to read the db.JSON file and return all saved notes as JSON
notes.get('/', (req, res) => {
  console.info(`${req.method} request received to view notes`);
  readFromFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
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
    // create a note object with title, text and id; uuid for assigning random id number to each note
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Obtain existing notes
    readFromFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note to the note array
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        writeToFile(
          join(__dirname, '..', 'db', 'db.json'),
          parsedNotes, null, 4,
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });
    // create a response object with a success status and details of the note that was just added
    const response = {
      status: 'success',
      body: newNote,
    };
    // lets user know the note was posted successfully and view details of the note that was just added
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
  readFromFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
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
      writeToFile(join(__dirname, '..', 'db', 'db.json'), notesLessOne, null, 4,
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : res.json(notesLessOne)
      )
    }
  })
  //rewrites page with deleted note now erased
  readFromFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', async (err, data) => {
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