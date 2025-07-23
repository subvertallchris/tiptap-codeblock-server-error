import { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { renderToMarkdown, renderToHTMLString } from "@tiptap/static-renderer";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const jsonContent = await request.json()
  const markdown = renderToMarkdown({
    extensions: [StarterKit],
    content: jsonContent as JSONContent,
  });

  const html = renderToHTMLString({
    extensions: [StarterKit],
    content: jsonContent as JSONContent,
  });

  console.log('output is', { markdown, html })

  return Response.json({ success: true, markdown, html })
}