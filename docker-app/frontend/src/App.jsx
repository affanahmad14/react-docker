import { useEffect, useState } from 'react';
import './index.css';
 

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  // Backend-URL
  const API_URL = import.meta.env.VITE_API_URL; // PORT durch den tatsächlichen Port ersetzen
  

  // Notizen vom Server laden
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fehler beim Laden:', err));
  }, []); 

  // Neue Notiz hinzufügen
  const addNote = () => {
    if (!note.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: note })
    })
      .then(res => res.json())
      .then(newNote => {
        setNotes([...notes, newNote]);
        setNote('');
      })
      .catch(err => console.error('Fehler beim Hinzufügen:', err));
  };

  // Notiz löschen
  const deleteNote = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(n => n.id !== id)))
      .catch(err => console.error('Fehler beim Löschen:', err));
  };

  return (
    <div className="container">
      <h1>📝 Mini-Notizblock</h1>
      <div className="input-group">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notiz eingeben..."
        />
        <button onClick={addNote}>Hinzufügen</button>
      </div>
      <ul className="note-list">
        {notes.map((n) => (
          <li key={n.id}>
            {n.text}
            <button onClick={() => deleteNote(n.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

