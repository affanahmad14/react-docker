import { useEffect, useState } from 'react';
import './index.css';



function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;  // API_URL ist leer, also werden relative Pfade verwendet

  // Notizen vom Server laden
  useEffect(() => {
    fetch('/api/notes')  // Korrekte URL
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fehler beim Laden:', err));
  },[]);

  // Neue Notiz hinzufügen
  const addNote = () => {
    if (!note.trim()) return;

    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: note })
    })
      .then(res => res.json())
      .then(() => {
        // Notizen neu laden
        fetch('/api/notes')  // Korrekte URL
          .then(res => res.json())
          .then(data => setNotes(data));
        setNote('');
      })
      .catch(err => console.error('Fehler beim Hinzufügen:', err));
  };

  // Notiz löschen
  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, { method: 'DELETE' })
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

