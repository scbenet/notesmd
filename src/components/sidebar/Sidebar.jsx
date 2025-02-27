import { useState } from "react";
import { Stack, Button, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import NoteList from "./NoteList";

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Stack spacing='md'>
      <Button leftIcon={<IconPlus size={16} />} fullWidth>
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
