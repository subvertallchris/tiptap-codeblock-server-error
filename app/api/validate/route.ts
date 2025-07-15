import { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { renderToMarkdown } from "@tiptap/static-renderer";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const jsonContent = await request.json()
  const output = renderToMarkdown({
    extensions: [StarterKit],
    content: jsonContent as JSONContent,
  });

  console.log('output is', output)


  return Response.json({ success: true})
}