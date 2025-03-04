import { create } from 'zustand';
import db from '../db';

const useNotesStore = create((set, get) => ({
  notes: [],
  currentNote: null,
  loading: true,

  // Load all notes from IndexedDB
  loadNotes: async () => {
    set({ loading: true });
    try {
      const allNotes = await db.notes.toArray();
      set({ notes: allNotes });

      // Set the first note as current if there's no current note
      const { currentNote } = get();
      if (allNotes.length > 0 && !currentNote) {
        set({ currentNote: allNotes[0] });
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Create a new note
  createNote: async (title = "Untitled Note") => {
    try {
      const newNoteId = await db.notes.add({
        title,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newNote = await db.notes.get(newNoteId);
      set((state) => ({ 
        notes: [...state.notes, newNote],
        currentNote: newNote
      }));
      return newNote;
    } catch (error) {
      console.error("Failed to create note:", error);
      return null;
    }
  },

  // Update a note
  updateNote: async (id, updates) => {
    try {
      await db.notes.update(id, {
        ...updates,
        updatedAt: new Date(),
      });

      // Refresh all notes
      await get().loadNotes();

      // Update the current note if it's the one being edited
      const { currentNote } = get();
      if (currentNote && currentNote.id === id) {
        const updatedNote = await db.notes.get(id);
        set({ currentNote: updatedNote });
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  },

  // Delete a note
  deleteNote: async (id) => {
    try {
      await db.notes.delete(id);

      // Refresh the notes list
      const remainingNotes = await db.notes.toArray();
      
      // If the deleted note was the current note, select another one
      const { currentNote } = get();
      set({ 
        notes: remainingNotes,
        currentNote: currentNote && currentNote.id === id
          ? (remainingNotes.length > 0 ? remainingNotes[0] : null)
          : currentNote
      });
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  },

  // Select a note to edit
  selectNote: async (id) => {
    try {
      const note = await db.notes.get(id);
      set({ currentNote: note });
      return note;
    } catch (error) {
      console.error("Failed to select note:", error);
      return null;
    }
  },
}));

export default useNotesStore;