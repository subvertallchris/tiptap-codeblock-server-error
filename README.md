# TipTap server rendered code blocks error

* Clone and run `npm i`
* Start  Next.js with `npm run dev`
* Visit `localhost:3000` in your browser
* Click on the editor input field (defaults to "Hello world!")
* Use ``` to start a code block and add some text
* Submit the form and see different results
  * Submit with server action unmodified to pass `editor.getJSON()` straight into the server action. It will crash.
  * Submit with server action after serializing/deserializing using JSON.parse(JSON.stringify(content)). It succeeds.
  * Submit over REST after serializing/deserializing. It succeeds.

```
Error: Cannot access language on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.
```

This same error appears when you try to validate content against the schema with ProseMirror using `Node.fromJSON(proseMirrorSchema, jsonContent);`. It goes away if you disable code blocks.

Success after serialize/deserialize suggests a reference to the browser is making it into the output of `editor.getJSON()` and then it's being passed over the wire by Next.js.