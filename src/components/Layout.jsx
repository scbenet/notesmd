import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

import Editor from "./editor/Editor";
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header";
import useNotesStore from "../store/notesStore";

export function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();
  const loadNotes = useNotesStore(state => state.loadNotes);
  
  // Load notes on initial mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Editor />
      </AppShell.Main>
    </AppShell>
  );
}

export default BasicAppShell;
