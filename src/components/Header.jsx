import { useState, useEffect } from 'react';
import {
  Title,
  Group,
  Burger,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  TextInput,
  Text,
  Box,
  Flex,
} from "@mantine/core";
import { IconSun, IconMoon, IconPencil, IconCheck, IconClock } from "@tabler/icons-react";
import useNotesStore from "../store/notesStore";
import { useDebouncedCallback } from "../hooks/useDebouncedCallback";

function Header({ opened, toggle }) {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();
  const dark = computedColorScheme === "dark";
  
  const currentNote = useNotesStore(state => state.currentNote);
  const updateNote = useNotesStore(state => state.updateNote);
  
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local title when current note changes
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || '');
    } else {
      setTitle('');
    }
  }, [currentNote]);
  
  // Debounced save function for title updates
  const saveTitle = useDebouncedCallback((newTitle) => {
    if (currentNote && newTitle !== currentNote.title) {
      setIsSaving(true);
      updateNote(currentNote.id, { title: newTitle }).then(() => {
        setTimeout(() => setIsSaving(false), 500);
      });
    }
  }, 500);
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    saveTitle(newTitle);
  };
  
  // Format the date nicely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Group h='100%' px='md' justify='space-between' wrap="nowrap">
      <Group wrap="nowrap">
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <Title order={3} style={{ whiteSpace: 'nowrap' }}>notes.md</Title>
      </Group>
      
      {currentNote ? (
        <Flex 
          style={{ 
            flex: 1, 
            overflow: 'hidden',
            justifyContent: 'center',
          }}
        >
          {isEditing ? (
            <TextInput
              value={title}
              onChange={handleTitleChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              autoFocus
              style={{ width: 'auto', maxWidth: '400px' }}
            />
          ) : (
            <Group onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }} wrap="nowrap">
              <Title order={4} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {title || 'Untitled Note'}
              </Title>
              <ActionIcon size="sm" variant="subtle">
                <IconPencil size="0.9rem" />
              </ActionIcon>
            </Group>
          )}
        </Flex>
      ) : (
        <Box style={{ flex: 1 }} />
      )}
      
      <Group wrap="nowrap">
        {currentNote && (
          <Box style={{ minWidth: '120px', textAlign: 'right' }}>
            {isSaving ? (
              <Text size="xs" c="dimmed">Saving...</Text>
            ) : (
              <Group gap="xs" wrap="nowrap" justify="flex-end">
                <IconCheck size="0.8rem" style={{ color: 'var(--mantine-color-green-6)' }} />
                <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                  <IconClock size="0.8rem" style={{ display: 'inline', verticalAlign: 'text-top', marginRight: '3px' }} />
                  {formatDate(currentNote.updatedAt)}
                </Text>
              </Group>
            )}
          </Box>
        )}
        
        <ActionIcon
          variant='outline'
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title='Toggle color scheme'
        >
          {dark ? <IconSun size='1.1rem' /> : <IconMoon size='1.1rem' />}
        </ActionIcon>
      </Group>
    </Group>
  );
}

export default Header;