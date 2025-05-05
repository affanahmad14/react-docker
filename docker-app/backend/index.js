const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const PORT = process.env.API_PORT || 3000;

app.use(cors()); // damit React auf die API zugreifen kann
app.use(express.json());

let notes = []; // In-Memory-Speicher (flüchtig)

// GET: Alle Notizen
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST: Neue Notiz hinzufügen
app.post('/api/notes', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text ist erforderlich' });
  }
  const newNote = { id: Date.now(), text: text.trim() };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE: Notiz löschen
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});

