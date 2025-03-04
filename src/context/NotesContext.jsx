import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import db from "../db";
// import { useDebouncedCallback } from "../hooks/useDebouncedCallback";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all notes from IndexedDB
  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const allNotes = await db.notes.toArray();
      setNotes(allNotes);

      // Set the first note as current if there's no current note
      if (allNotes.length > 0 && !currentNote) {
        setCurrentNote(allNotes[0]);
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  }, [currentNote]);

  // Load notes on initial mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Create a new note
  const createNote = async (title = "Untitled Note") => {
    try {
      const newNoteId = await db.notes.add({
        title,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newNote = await db.notes.get(newNoteId);
      setNotes((prev) => [...prev, newNote]);
      setCurrentNote(newNote);
      return newNote;
    } catch (error) {
      console.error("Failed to create note:", error);
      return null;
    }
  };

  // Update a note
  const updateNote = async (id, updates) => {
    try {
      await db.notes.update(id, {
        ...updates,
        updatedAt: new Date(),
      });

      // Refresh the list of notes
      loadNotes();

      // Update the current note if it's the one being edited
      if (currentNote && currentNote.id === id) {
        const updatedNote = await db.notes.get(id);
        setCurrentNote(updatedNote);
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await db.notes.delete(id);

      // Refresh the notes list
      const remainingNotes = await db.notes.toArray();
      setNotes(remainingNotes);

      // If the deleted note was the current note, select another one
      if (currentNote && currentNote.id === id) {
        setCurrentNote(remainingNotes.length > 0 ? remainingNotes[0] : null);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Select a note to edit
  const selectNote = async (id) => {
    try {
      const note = await db.notes.get(id);
      setCurrentNote(note);
      return note;
    } catch (error) {
      console.error("Failed to select note:", error);
      return null;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        currentNote,
        loading,
        createNote,
        updateNote,
        deleteNote,
        selectNote,
        refreshNotes: loadNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
