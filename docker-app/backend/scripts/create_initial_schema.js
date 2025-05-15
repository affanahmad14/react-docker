import { query } from '../src/db.js';

async function run() {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS notes(
                id SERIAL PRIMARY KEY,
                text_content TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        await query(`
            INSERT INTO notes (text_content) VALUES 
            ('Test Note 1'),
            ('Test Note 2'),
            ('Test Note 3');
        `);
        
        console.log('Database schema created successfully');
    } catch (error) {
        console.error('Error creating database schema:', error);
        throw error;
    }
}

run().catch(console.error);