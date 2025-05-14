import { query } from '../src/db.js';
async function run() {
    await query(`CREATE TABLE IF NOT EXISTS notes(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO notes (title) VALUES
    ('Test Note 1', 'This is a test note.'),
    ('Test Note 2', 'This is another test note.'),
    ('Test Note 3', 'This is yet another test note.');
    `);
}
run().catch(console.error);