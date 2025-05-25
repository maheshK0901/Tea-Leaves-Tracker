import React, { useState, useEffect, useRef } from "react";
import "../styles/notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const isInitialized = useRef(false);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    isInitialized.current = true;
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleTogglePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    if (newNoteText.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: newNoteText,
      timestamp: new Date().toLocaleString(),
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notes?")) {
      setNotes([]);
      setEditingNoteId(null);
      setEditText("");
      setNewNoteText("");
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const handleEditNote = (id, text) => {
    setEditingNoteId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, text: editText, timestamp: new Date().toLocaleString() }
        : note
    );
    setNotes(updatedNotes);
    setEditingNoteId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditText("");
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    if (editingNoteId === id) {
      setEditingNoteId(null);
      setEditText("");
    }
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>

      <div className="note-input-container">
        <textarea
          rows="3"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Write your note here..."
        />
        <button onClick={handleAddNote}>Add Note</button>
        <button onClick={handleClearAll} className="clear-all">
          Clear All Notes
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet.</p>
        ) : (
          sortedNotes.map((note) => (
            <div key={note.id} className={`note-card ${note.pinned ? "pinned" : ""}`}>
              {editingNoteId === note.id ? (
                <>
                  <textarea
                    rows="3"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="note-actions">
                    <button onClick={() => handleSaveEdit(note.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="note-text">{note.text}</p>
                  <p className="note-timestamp">{note.timestamp}</p>
                  <div className="note-actions">
                    <button onClick={() => handleEditNote(note.id, note.text)}>Edit</button>
                    <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                    <button onClick={() => handleTogglePin(note.id)}>
                      {note.pinned ? "Unpin" : "Pin"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
