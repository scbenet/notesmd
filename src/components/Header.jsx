import { Group, Burger } from '@mantine/core'

function Header({ opened, toggle}) {
    return (
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Hello From the Header!
        </Group>
    )
}

export default Header;