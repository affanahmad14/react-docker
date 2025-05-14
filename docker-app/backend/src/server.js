import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises'
import path from 'path';
import healthRouter from './routes/health.js'; // Importiere den Health-Check-Router
import logger from './config/logger.js'; // Importiere den Logger
import { testDbConnection } from './db.js';
import notesRouter from './routes/notes.js'; // Importiere den Notizen-Router


dotenv.config(); // Umgebungsvariablen laden

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const dataDir = '/app/data';  //Eventuell anpassen
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
app.use("/health", healthRouter);
app.use("/notes", notesRouter); // Verwende den Notizen-Router





app.listen(port, async () => {
  logger.info('Starting backend API...'); // Verwende den Logger
  logger.info('Database Configuration (received via ENV):', {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD ? '[REDACTED]' : 'N/A'
  });
  logger.info('-------------------------------------------');
  try {
    await testDbConnection();
    logger.info('Initial DB connection successful.');
  } catch (err) {
    logger.error('Initial DB connection failed. Exiting...');
    process.exit(1);
  }
  logger.info(`Server läuft auf http://localhost:${port}`); // Verwende den Logger
});




