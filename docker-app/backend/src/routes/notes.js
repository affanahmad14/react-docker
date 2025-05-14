import express from 'express';
import logger from '../config/logger.js';
import {
    findAllItems,
    findItemById,
    createItem,
    deleteItem,
    updateItem
} from '../../services/notes.service.js';

const router = express.Router();

// GET: Alle Notizen
router.get('/', async (req, res) => {
    try {
        const notes = await findAllItems();
        res.json(notes);
    } catch (error) {
        logger.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Neue Notiz hinzufügen
router.post('/', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ error: 'Text ist erforderlich' });
        }
        const newNote = await createItem({ title: text.trim() });
        res.status(201).json(newNote);
    } catch (error) {
        logger.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE: Notiz löschen
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteItem(id);
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;