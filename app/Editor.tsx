'use client';
import * as React from 'react';
import { useEditor, EditorContent, useEditorState, } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Editor() {
  const [markdown, setMarkdown] = React.useState('');
  const [html, setHtml] = React.useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Bold"},{"type":"text","marks":[{"type":"underline"}],"text":" underline"},{"type":"text","text":" "},{"type":"text","marks":[{"type":"bold"},{"type":"underline"}],"text":"bold+underline"}]}]},
    immediatelyRender: false,
  })

  const editorState = useEditorState({ editor,  selector: ({ editor }) => {
    if (!editor) return null;

    return {
      currentContent: editor.getJSON(),
    };
    },
  })


  const onPost = async () => {
    const currentContent = editorState?.currentContent

    if (!currentContent) {
      alert('No content to post, type something!')
    };

    const response = await fetch('/api/validate', {
      method: 'POST',
      body: JSON.stringify(currentContent),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setMarkdown(data.markdown)
    setHtml(data.html)
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
    <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
      <EditorContent editor={editor} />
    </div>

    <div>Add a code block with content in the editor using ```. Submit it see the output below. Underline has {'<u>'} but bold is parsed correctly.</div>
    <button onClick={onPost} style={{ backgroundColor: 'green', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>Post to API</button>
    <div>
      <h3>Markdown</h3>
      <code>{markdown}</code>
    </div>
    <div>
      <h3>HTML</h3> 
      <code>{html}</code>
    </div>
  </div>
}