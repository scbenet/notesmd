import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Editor from './editor/Editor'
import Sidebar from './sidebar/Sidebar'
import Header from './Header'

export function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Editor />
      </AppShell.Main>
    </AppShell>
  );
}

export default BasicAppShell;