import { validateData } from "./actions";
import Editor from "./Editor";

export default function Home() {


  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ marginBottom: '16px' }}>Hello, TipTap</h1>

      <Editor submit={validateData} />
    </div>
  );
}
