import Editor from "@monaco-editor/react"

type CodeEditorProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
};


function CodeEditor({
  code,
  setCode,
  language,
}: CodeEditorProps) {
  return (
   
 <div className="rounded-2xl overflow-hidden">
    <div className="h-5 bg-[#161616] border-b border-zinc-800"></div>
  <Editor
    height="calc(100vh - 9rem)"
    language={language}
    value={code}
    onChange={(value) => setCode(value || "")}
    defaultValue="// write code here"
    theme="vs-dark"
    width="100%"
    options={{
      automaticLayout: true,

      fontFamily: "JetBrains Mono",
      fontLigatures: true,
      lineHeight: 24,

      lineNumbersMinChars: 3,

      glyphMargin: false,
      folding: false,
      minimap: {
        enabled: false,
      },

      scrollBeyondLastLine: false,

      smoothScrolling: true,

      cursorBlinking: "blink",
      

      wordWrap: "off",

      scrollbar: {
        horizontal: "auto",
        vertical: "auto",
        horizontalScrollbarSize: 6,
        verticalScrollbarSize: 6,
        alwaysConsumeMouseWheel: false,
      },

      padding: {
        top: 20,
        bottom: 10,
      },
    }}
  />
</div>


  );
}



export default CodeEditor;