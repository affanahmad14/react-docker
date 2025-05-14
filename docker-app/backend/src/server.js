import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises'
import path from 'path';

dotenv.config(); // Umgebungsvariablen laden

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const dataDir = '/app/data';
const dataFilePath = path.join(dataDir, 'items.json');

let notes = []; // In-Memory-Speicher (flüchtig)
// Verzeichnis erstellen, falls es nicht existiert
async function ensureDataDirExists() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Fehler beim Erstellen des Datenverzeichnisses:', error);
  }
}

// Daten aus Datei laden
async function loadData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    notes = JSON.parse(data);
    console.log('Daten erfolgreich geladen.');
  } catch (error) {
    console.warn('Daten konnten nicht geladen werden. Initialisiere leeres Array.');
    notes = [];
  }
}

// Daten in Datei speichern
async function saveData() {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(notes, null, 2));
    console.log('Daten erfolgreich gespeichert.');
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
  }
}

// Initialisierung
(async () => {
  await ensureDataDirExists();
  await loadData();
})();

app.use(cors()); // damit React auf die API zugreifen kann
app.use(express.json());



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

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
  });


