// Require directories/libraries
const express = require('express');
const path = require('path');
// fs for writing new files/items
const fs = require('fs');
// UUID see README for resource
const { v4: uuidv4 } = require('uuid');
const app = express();

// Start program on PORT location
const PORT = process.env.PORT || 3001;

// middleware for json
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET request for HTTP
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Add this route to ensure GET requests to /api/notes return the correct JSON
app.get('/api/notes', (req, res) => {
    console.log('Request to /api/notes received');
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8'));
    res.json(notes);
});

// Redirect all other routes to the homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create location for "API"
// POST req,res
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    // Get existing notes from the db.json file
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8'));
    // Add the new note to the array
    notes.push(newNote);
    // Write the updated array back to the db.json file
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));
    res.json(newNote); // Return the new note to the client
});

// try to write a delete function for extra points
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  // Log the received note ID for debugging
  console.log('Received DELETE request for note ID:', noteId);
  // Your logic to delete the note from the array and update the db.json file
  res.json({ success: true, message: 'Note deleted successfully' });
});

// Start program
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});