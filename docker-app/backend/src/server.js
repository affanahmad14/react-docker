import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Umgebungsvariablen laden

const app = express();
const port = process.env.PORT || 3000;

let notes = []; // In-Memory-Speicher (flüchtig)

app.use(cors()); // damit React auf die API zugreifen kann
app.use(express.json());

app.listen(port, () => {
console.log(`Server läuft unter http://localhost:${port}`);
});

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




