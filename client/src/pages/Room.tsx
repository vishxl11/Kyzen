import CodeEditor from "../components/editor/CodeEditor";
import LanguageSelector from "../components/editor/LanguageSelector";
import InputBox from "../components/execution/InputBox";
import OutputBox from "../components/execution/OutputBox";
import Navbar from "../components/Navbar";
import UserList from "../components/room/UserList";
import RunButton from "../components/execution/RunButton";
import type { ServerMessage } from "../types/protocol";
import useWebSocket from "../hooks/useWebSocket";
import { useState,useCallback,useRef } from "react";
import { useParams } from "react-router-dom";
import useYjs from "../hooks/useYjs";

export default function Room()
{  
    
    // --- WHO IS IN THE ROOM ---
const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

// --- EDITOR ---
const [language, setLanguage] = useState<string>("javascript");

// --- EXECUTION ---
const [input, setInput] = useState<string>("");        // stdin for the program
const [output, setOutput] = useState<string>("");      // stdout result
const [isRunning, setIsRunning] = useState<boolean>(false); // to disable run button while executing

// --- ROOM INFO (not useState, just read from router/localStorage) ---
const { roomId} = useParams<{roomId: string }>();
const userName = localStorage.getItem("userName")!;
const applyRemoteUpdateRef = useRef<((base64: string) => void) | null>(null)
const applyRemoteAwarenessRef = useRef<((base64: string) => void) | null>(null)


   const messageHandler = useCallback(
   (message: ServerMessage) => {

     if(message.type=="USER_JOINED") {
        setConnectedUsers(message.payload.connectedUsers)
      }
      else if(message.type=="SESSION_JOINED") {
        setConnectedUsers(message.payload.connectedUsers)
      }
      else if(message.type=="USER_LEFT") {
         setConnectedUsers(message.payload.connectedUsers)
      }
      else if(message.type=="EXECUTION_RESULT")
      {
         if(message.payload.output!="")
        {
            setOutput(message.payload.output);
        }
         else
         {
            setOutput(message.payload.error) ;
         }
        
         console.log(output) ;
         setIsRunning(false);
      }
      else if(message.type=="YJS_UPDATE")
      {
          applyRemoteUpdateRef.current?.(message.payload.update) 
      }
      else if(message.type=="AWARENESS_UPDATE")
      {   
          applyRemoteAwarenessRef.current?.(message.payload.update) 
      }

   },
   []
);


           

     const send=useWebSocket(roomId!,userName,messageHandler) ;

     const { ytext, awareness, applyRemoteUpdate, applyRemoteAwareness } = useYjs(roomId!, userName, send)

      // wire them up after both hooks are called
      applyRemoteUpdateRef.current = applyRemoteUpdate
      applyRemoteAwarenessRef.current = applyRemoteAwareness

     function handleRunCode()
        {
        setIsRunning(true);

        send(
            "RUN_CODE",
            {
                 code: ytext.toString(),
                language,
                input,
                roomId
            }
        );
        }



     return(
        <div className="bg-[#0a0a0a] min-h-screen overflow-hidden">
            <Navbar/>
          
        <div className="flex h-[calc(100vh-4rem)] gap-4 px-2 py-2">
        <div className="w-[60%] flex flex-col gap-2">

            <LanguageSelector
             language={language}
             setLanguage={setLanguage}/>

            <CodeEditor
            yText={ytext}
            awareness={awareness}
            language={language}/>



        </div>

      <div className="w-[40%] flex flex-col gap-2">
       
        <RunButton
         onClick={handleRunCode}
         isRunning={isRunning}/>
        
        <InputBox
         input={input}
         setInput={setInput}/>
       
        <OutputBox
         output={output}/>

        <UserList
         connectedUsers={connectedUsers}
           roomId={roomId}/>

        </div>

        </div>

        </div>
     )
}


