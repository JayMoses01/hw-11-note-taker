const express = require("express");
const path = require('path');
const fs = require('fs');
let db = require("./db/db.json");

const app = express();
const uuid = require('./helpers/uuid.js');

require('dotenv');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log(__dirname);
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes", (req, res) => {
  res.status(200).json(db)
});

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
      id: uuid(),
    };

    // Obtain existing notes

    
        // Convert string into JSON object

        // Add a new note
        db.push(newNote);

        // Write updated notes back to the file
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


//DELETE request to delete a note. NOT FINISHED YET, BUT EVERYTHING ELSE WORKS.
/*
app.delete('api/notes/:id', (req,res) => {
  // Log that a DELETE request was received
  console.info(`${req.method} request received to delete note ${req.params.id}`);

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedReviews = JSON.parse(data);


        // Delete note
        param("id", (req, res, next, id) => {
          console.log(id)
          next()
        })

        // Write updated notes back to the file
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
*/



app.listen(PORT, () => {
  console.log(`Note Taker app is listening at http://localhost:${PORT}`)
});



