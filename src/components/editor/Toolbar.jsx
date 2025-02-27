import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { 
  IconBold, IconItalic, IconUnderline, IconStrikethrough,
  IconList, IconListNumbers, IconCode, IconLink
} from '@tabler/icons-react';

function Toolbar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <Group spacing="xs" mb="md">
      <Tooltip label="Bold">
        <ActionIcon 
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'filled' : 'subtle'}
        >
          <IconBold size={16} />
        </ActionIcon>
      </Tooltip>
      
      <Tooltip label="Italic">
        <ActionIcon 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'filled' : 'subtle'}
        >
          <IconItalic size={16} />
        </ActionIcon>
      </Tooltip>
      
      <Tooltip label="Bullet List">
        <ActionIcon 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'filled' : 'subtle'}
        >
          <IconList size={16} />
        </ActionIcon>
      </Tooltip>
      
      <Tooltip label="Numbered List">
        <ActionIcon 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive('orderedList') ? 'filled' : 'subtle'}
        >
          <IconListNumbers size={16} />
        </ActionIcon>
      </Tooltip>
      
      <Tooltip label="Code Block">
        <ActionIcon 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('codeBlock') ? 'filled' : 'subtle'}
        >
          <IconCode size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

export default Toolbar;
