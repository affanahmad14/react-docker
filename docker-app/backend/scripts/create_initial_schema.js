import { query } from '../src/db.js';
async function run() {
    await query(`CREATE TABLE IF NOT EXISTS notes(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO notes (title) VALUES
    ('Test Note 1'),
    ('Test Note 2'),
    ('Test Note 3');
    `);
}
run().catch(console.error);