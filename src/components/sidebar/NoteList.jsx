import { Stack, Text, LoadingOverlay } from "@mantine/core";

import NoteItem from "./NoteItem";
import useNotesStore from "../../store/notesStore";

function NoteList({ searchQuery }) {
  const notes = useNotesStore(state => state.notes);
  const currentNote = useNotesStore(state => state.currentNote);
  const selectNote = useNotesStore(state => state.selectNote);
  const loading = useNotesStore(state => state.loading);
  
  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Stack spacing='xs' style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Text size='sm' fw={500} c='dimmed'>
        Your Notes
      </Text>
      {filteredNotes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          isSelected={currentNote && note.id === currentNote.id}
          onSelect={selectNote}
        />
      ))}
      {filteredNotes.length === 0 && !loading && (
        <Text size='sm' c='dimmed'>
          No notes found
        </Text>
      )}
    </Stack>
  );
}

export default NoteList;
