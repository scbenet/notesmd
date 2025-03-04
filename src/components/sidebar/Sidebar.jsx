import { useState } from "react";
import { 
  Stack, 
  Button, 
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import NoteList from "./NoteList";
import useNotesStore from "../../store/notesStore";

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const createNote = useNotesStore(state => state.createNote);

  return (
    <Stack spacing='md'>
      <Button 
        leftSection={<IconPlus size={16} />} 
        fullWidth
        onClick={() => createNote()}
      >
        New Note
      </Button>

      <TextInput
        placeholder='Search notes...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <NoteList searchQuery={searchQuery} />
    </Stack>
  );
}

export default Sidebar;