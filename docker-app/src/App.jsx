import { useState } from 'react'
import './index.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note.trim()]);
      setNote('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
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
        {notes.map((n, i) => (
          <li key={i}>
            {n}
            <button onClick={() => deleteNote(i)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default App
