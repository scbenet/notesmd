import { Stack, Text, LoadingOverlay } from "@mantine/core";

import NoteItem from "./NoteItem";
import { useNotes } from "../../context/NotesContext";

function NoteList({ searchQuery }) {
  const { notes, currentNote, selectNote, loading } = useNotes();
  
  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Stack spacing='xs' style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Text size='sm' weight={500} color='dimmed'>
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
