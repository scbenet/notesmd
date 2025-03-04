import { Paper, Text, Group } from '@mantine/core';

function NoteItem({ note, isSelected, onSelect }) {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString();
  
  return (
    <Paper 
      p="xs" 
      withBorder 
      sx={(theme) => ({
        cursor: 'pointer',
        backgroundColor: isSelected 
          ? theme.colorScheme === 'dark' 
            ? theme.colors.dark[5] 
            : theme.colors.gray[1]
          : 'transparent',
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' 
            ? theme.colors.dark[6] 
            : theme.colors.gray[0],
        },
      })}
      onClick={() => onSelect(note.id)}
    >
      <Group position="apart">
        <Text size="sm" weight={500}>{note.title}</Text>
        <Text size="xs" color="dimmed">{formattedDate}</Text>
      </Group>
    </Paper>
  );
}

export default NoteItem;
