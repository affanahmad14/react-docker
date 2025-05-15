import { query } from '../src/db.js';

async function findAllItems() {
    const notes = await query('SELECT id, text_content as text FROM notes ORDER BY created_at ASC;');
    return notes.rows;
}

async function findItemById(id) {
    const res = await query('SELECT id, text_content as text FROM notes WHERE id = $1;', [id]);
    return res.rows[0];
}

async function createItem(item) {
    const res = await query(
        'INSERT INTO notes (text_content) VALUES ($1) RETURNING id, text_content as text;',
        [item.text]
    );
    return res.rows[0];
}

async function updateItem(id, item) {
    const res = await query(
        'UPDATE notes SET text_content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, text_content as text;',
        [item.text, id]
    );
    return res.rows[0];
}

async function deleteItem(id) {
    return query('DELETE FROM notes WHERE id = $1;', [id]);
}

export {
    findAllItems,
    findItemById,
    createItem,
    updateItem,
    deleteItem
};