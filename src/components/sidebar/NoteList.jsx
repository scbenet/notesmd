import { Stack, Text } from "@mantine/core";

import NoteItem from "./NoteItem";

function NoteList({ searchQuery }) {
  // This will be replaced with actual data from IndexedDB later
  const dummyNotes = [
    { id: 1, title: "Welcome Note", updatedAt: new Date() },
    { id: 2, title: "Project Ideas", updatedAt: new Date() },
  ];

  return (
    <Stack spacing='xs'>
      <Text size='sm' weight={500} color='dimmed'>
        Your Notes
      </Text>
      {dummyNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
      {dummyNotes.length === 0 && (
        <Text size='sm' color='dimmed'>
          No notes found
        </Text>
      )}
    </Stack>
  );
}

export default NoteList;
