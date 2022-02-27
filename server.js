const express = require("express");
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /public/index.html or /public/notes.html'));

app.get('/landing', (req, res) => {
    console.log(__dirname);
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.listen(PORT, () => {
  console.log(`Note Taker app is listening at http://localhost:${PORT}`)
});

















