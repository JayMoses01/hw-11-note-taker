// JRM: These variables link the requires package, paths, and files.
const express = require("express");
const path = require('path');
const fs = require('fs');
let db = require("./db/db.json");
const uuid = require('./helpers/uuid.js');

require('dotenv');
const PORT = process.env.PORT || 3001;

// JRM: Activates Express application.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// JRM: GET request for landing page.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// JRM: GET request for the Notes page.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// JRM: GET request to obtain created notes from where they are saved (in the db.json file).
app.get("/api/notes", (req, res) => {
  res.status(200).json(db)
});

// JRM: POST request to add a new note.
app.post('/api/notes', (req, res) => {
  // JRM: Logs a message that a POST request was received to add a note.
  console.info(`${req.method} request received to add a note`);

  // JRM: Destructuring req.body for note title and text contents.
  const { title, text } = req.body;

  // JRM: Condition to require both note title and text to create the note.
  if (title && text) {
    // Variable for the created note object, including a random note ID.
    const newNote = {
      title,
      text,
      id: uuid(),
    };
      // JRM: Adds the new note into the note storage file (db.json).
      db.push(newNote);

      // JRM: Writes the updated notes to db.json again. Sends an error message if the required title and text are not present and does not save the new note.
      fs.writeFile(
        './db/db.json',
        JSON.stringify(db),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
      );
    res.sendStatus(200);
  } else {
    res.status(500).json('Error in adding note');
  }
});

// JRM: Triggers the application to listen on a port.
app.listen(PORT, () => {
  console.log(`Note Taker app is listening at http://localhost:${PORT}`)
});
