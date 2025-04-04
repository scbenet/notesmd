import { useState } from 'react';
import { 
  Paper, 
  Text, 
  Group, 
  ActionIcon, 
  Modal,
  Button,
  Box,
  useMantineColorScheme 
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import useNotesStore from '../../store/notesStore';

function NoteItem({ note, isSelected, onSelect }) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteNote = useNotesStore(state => state.deleteNote);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  const handleNoteClick = () => {
    onSelect(note.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the note selection
    
    // Show confirmation dialog if note has content
    if (note.content && note.content.trim() !== '') {
      setDeleteModalOpen(true);
    } else {
      deleteNote(note.id);
    }
  };

  return (
    <>
      <Paper 
        p="xs" 
        withBorder 
        style={{
          borderLeft: isSelected 
            ? `3px solid var(--mantine-primary-color-${isDark ? '5' : '6'})` 
            : '3px solid transparent',
          transition: 'all 0.2s ease',
          position: 'relative',
        }}
        onClick={handleNoteClick}
        onMouseEnter={() => setShowDeleteIcon(true)}
        onMouseLeave={() => setShowDeleteIcon(false)}
        styles={() => ({
          root: {
            cursor: 'pointer',
            backgroundColor: isSelected
              ? isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-1)'
              : 'transparent',
            '&:hover': {
              backgroundColor: isDark
                ? 'var(--mantine-color-dark-5)'
                : 'var(--mantine-color-gray-0)',
            },
          },
        })}
      >
        <Group justify="space-between" align="center" style={{ minHeight: 22 }}>
          <Text size="sm" fw={isSelected ? 600 : 500} style={{ wordBreak: 'break-word', flexGrow: 1 }}>
            {note.title}
          </Text>
          
          <Box style={{ width: 24, flexShrink: 0, opacity: showDeleteIcon ? 1 : 0 }}>
            <ActionIcon 
              variant="subtle" 
              radius="xl"
              size="sm"
              color="light"
              onClick={handleDeleteClick}
              style={{ visibility: showDeleteIcon ? 'visible' : 'hidden' }}
              title="Delete note"
            >
              <IconX size={14} />
            </ActionIcon>
          </Box>
        </Group>
      </Paper>

      {/* Delete confirmation modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete note?"
        centered
        size="sm"
      >
        <Text size="sm" mb="md">
          Are you sure you want to delete this note? This action cannot be undone.
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button 
            color="red" 
            onClick={() => {
              deleteNote(note.id);
              setDeleteModalOpen(false);
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default NoteItem;
