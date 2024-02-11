const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'));
}
);

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    notes.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(newNote);
}
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}
);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
}
);