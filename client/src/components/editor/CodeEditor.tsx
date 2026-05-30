import Editor from "@monaco-editor/react"
import type { Awareness } from "y-protocols/awareness"
import type * as Y from "yjs"
import { MonacoBinding } from "y-monaco"

type CodeEditorProps = {
  language: string
  yText: Y.Text
  awareness: Awareness
}


function CodeEditor({
 language,
  yText,
  awareness
}: CodeEditorProps) {
  return (
   
 <div className="rounded-2xl overflow-hidden">
    <div className="h-5 bg-[#161616] border-b border-zinc-800"></div>
  <Editor
    height="calc(100vh - 9rem)"
    language={language}
    defaultValue="// write code here"
    onMount={(editor, monaco) => {
    new MonacoBinding(yText, editor.getModel()!, new Set([editor]), awareness)

    console.log("MonacoBinding awareness clientID:", awareness.clientID)

    awareness.on('change', () => {
        console.log("states in onMount:", JSON.stringify([...awareness.getStates()]))
    })

    // inject color styles for each remote user
    awareness.on('change', () => {
        awareness.getStates().forEach((state, clientId) => {
            if (clientId === awareness.clientID) return
            const color = state.color
            if (!color) return

            const styleId = `yjs-style-${clientId}`
            if (document.getElementById(styleId)) return

            const style = document.createElement('style')
            style.id = styleId
            style.innerHTML = `
                .yRemoteSelection-${clientId} { background-color: ${color}; opacity: 0.3; }
                .yRemoteSelectionHead-${clientId} { border-color: ${color}; }
                .yRemoteSelectionHead-${clientId}::after { content: "${state.name}"; background: ${color}; color: white; font-size: 11px; padding: 2px 6px; border-radius: 3px; position: absolute; top: -1.4em; left: -2px; white-space: nowrap; pointer-events: none; }
            `
            document.head.appendChild(style)
        })
    })
}}
    theme="vs-dark"
    width="100%"
    options={{
      automaticLayout: true,

      fontFamily: "JetBrains Mono",
      fontLigatures: true,
      lineHeight: 24,

      lineNumbersMinChars: 3,

      glyphMargin: true,
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