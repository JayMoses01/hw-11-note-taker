const express = require("express");
const path = require('path');
const fs = require('fs');

const app = express();
const uuid = require('./Develop/helpers/uuid.js');

require('dotenv');
const PORT = process.env.PORT || 3001;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

/*
app.get('/', (req, res) => res.send('Navigate to /public/index.html or /public/notes.html'));
*/

app.get('/', (req, res) => {
    console.log(__dirname);
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

/*
app.get('/api/landing', (req, res) => {
    console.log(__dirname);
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});
*/

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);


// Need to make it so when on the Notes page, clicking the plus sign saves the note. I'm guessing this is a POST that I need to add.

// POST request to add a note
app.post('/api/notes', (req, res) => {
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
        note_id: uuid(),
      };
  
      // Obtain existing notes
      fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new note
          parsedNotes.push(newNote);
  
          // Write updated notes back to the file
          fs.writeFile(
            './Develop/db/db.json',
            JSON.stringify(parsedNotes, null, 4),
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
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in adding note');
    }
  });

































app.listen(PORT, () => {
  console.log(`Note Taker app is listening at http://localhost:${PORT}`)
});

















