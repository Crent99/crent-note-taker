const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Start program on PORT location
const PORT = process.env.PORT || 3001;

// middleware for json
app.use(express.json());
app.use(express.static('public'));

// GET request for notes
app.get('/api/notes', (req, res) => {
    // read the db.json file
    let data
    try {
        data = fs.readFileSync('./db/db.json', 'utf8');
    } catch (err) {
        console.error(err)
    }
// parse the data to get the notes
    const notes = JSON.parse(data);
    res.json(notes);
}
);

// POST request for notes
app.post('/api/notes', (req, res) => {
    // read the db.json file
    let data
    try {
        data = fs.readFileSync('./db/db.json', 'utf8');
    } catch (err) {
        console.error(err)
    }
    // parse the data to get the notes
    const notes = JSON.parse(data);
    // create a new note
    const newNote = req.body;
    newNote.id = uuidv4();
    // push the new note to the notes array
    notes.push(newNote);
    // write the new notes array to the db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
}
);

// DELETE request for notes
app.delete('/api/notes/:id', (req, res) => {
    // read the db.json file
    let data
    try {
        data = fs.readFileSync('./db/db.json', 'utf8');
    } catch (err) {
        console.error(err)
    }
    // parse the data to get the notes
    const notes = JSON.parse(data);
    // filter out the note with the matching id
    const newNotes = notes.filter(note => note.id !== req.params.id);
    // write the new notes array to the db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    res.json(newNotes);
}
);

// GET request for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}
);

// GET request for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
}
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
}
);