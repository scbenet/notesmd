import {
  Title,
  Text,
  Group,
  Burger,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

function Header({ opened, toggle }) {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();
  const dark = computedColorScheme === "dark";

  return (
    <Group h='100%' px='md' justify='space-between'>
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <Title order={2}>Notesmd</Title>
        <Text>Edit markdown and take notes</Text>
      </Group>

      <ActionIcon
        variant='outline'
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title='Toggle color scheme'
      >
        {dark ? <IconSun size='1.1rem' /> : <IconMoon size='1.1rem' />}
      </ActionIcon>
    </Group>
  );
}

export default Header;