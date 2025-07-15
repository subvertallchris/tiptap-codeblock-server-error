'use client';
import * as React from 'react';
import { useEditor, EditorContent, useEditorState, } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Editor({ submit }: { submit: (content: unknown) => Promise<void> }) {
  const [content, setContent] = React.useState('<p>Hello World! 🌎️</p>');

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
  })

  const editorState = useEditorState({ editor,  selector: ({ editor }) => {
    if (!editor) return null;

    return {
      currentContent: editor.getJSON(),
    };
    },
  })

  const onSubmit = () => {
    const newContent = editorState?.currentContent
    submit(newContent)
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
<div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
    <EditorContent editor={editor} />
</div>

    <div>Add a code block with content in the editor using ```. Submit it and look at your server console to see the error.</div>
    <button onClick={onSubmit} style={{ backgroundColor: 'purple', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>Submit</button>
  </div>
}