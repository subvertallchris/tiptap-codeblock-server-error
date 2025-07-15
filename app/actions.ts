'use server';
import { type JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { renderToHTMLString, renderToMarkdown } from '@tiptap/static-renderer';


export async function validateData(jsonContent: unknown) {
  // An error will be thrown here
  const output = renderToMarkdown({
    extensions: [StarterKit],
    content: jsonContent as JSONContent,
  });

  console.log('output is', output)

  return;
}
