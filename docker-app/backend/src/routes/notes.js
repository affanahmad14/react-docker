import express from 'express';
import logger from '../../config/logger.js';
import {
    findAllItems,
    findItemById,
    createItem,
    deleteItem,
    updateItem
  } from '../../services/notes.service.js';

const router = express.Router();
// GET: Alle Notizen
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST: Neue Notiz hinzufügen
app.post('/api/notes', async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text ist erforderlich' });
  }
  const newNote = { id: Date.now(), text: text.trim() };
  notes.push(newNote);
  await saveData(); // Daten speichern
  res.status(201).json(newNote);
});

// DELETE: Notiz löschen
app.delete('/api/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  await saveData(); // Daten speichern
  res.status(204).send();
});

export default router;