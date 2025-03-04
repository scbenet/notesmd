import { useEffect } from "react";

import { Text, Box, Center, Paper, Stack, Button } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import { createLowlight } from "lowlight";
import { IconPlus } from "@tabler/icons-react";

import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import { useNotes } from "../../context/NotesContext";

const lowlight = createLowlight();

lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("js", js);
lowlight.register("python", python);
lowlight.register("bash", bash);
lowlight.register("yaml", yaml);
lowlight.register("json", json);


export default function Editor() {
  const { currentNote, updateNote, createNote } = useNotes();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Your text here..." }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: currentNote?.content || "",
    onUpdate: ({ editor }) => {
      saveContent(editor.getHTML());
    },
  });

  // Set editor content when current note changes
  useEffect(() => {
    if (editor && currentNote) {
      // Only set content if it's different to avoid selection/cursor jumps
      const currentContent = editor.getHTML();
      if (currentContent !== currentNote.content) {
        editor.commands.setContent(currentNote.content || "");
      }
    }
  }, [editor, currentNote]);

  // Debounced save to avoid too many updates
  const saveContent = useDebouncedCallback((content) => {
    if (currentNote) {
      updateNote(currentNote.id, { content });
    }
  }, 500);

  if (!currentNote) {
    return (
      <Center style={{ height: "100%" }}>
        <Paper p='xl' withBorder shadow='md'>
          <Stack align='center' spacing='lg'>
            <Text>No note selected</Text>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => createNote()}
            >
              Create a new note
            </Button>
          </Stack>
        </Paper>
      </Center>
    );
  }

  return (
    <Box>
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
    </Box>
  );
}
