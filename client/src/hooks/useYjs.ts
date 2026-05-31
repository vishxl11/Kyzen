import * as Y from "yjs" ;
import { Awareness,encodeAwarenessUpdate,applyAwarenessUpdate } from "y-protocols/awareness.js";
import { useEffect, useRef } from "react";

function generateColor(userName: string) {
    let hash = 0
    for (let i = 0; i < userName.length; i++) {
        hash = userName.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = Math.abs(hash) % 360
    return `hsl(${hue}, 70%, 60%)`
}

export default function useYjs(roomId:string,userName:string,sendMessage:(type: string, payload: object) => void)
{
     const ydocRef = useRef(new Y.Doc())
    const awarenessRef = useRef(new Awareness(ydocRef.current))
    const ytext = ydocRef.current.getText('monaco')
   

    useEffect(()=>{

        const awareness=awarenessRef.current ;
         awareness.setLocalState({ name: userName ,color:generateColor(userName)})

        //It will fire when the local user will type anything
        const docUpdateHandler = (update: Uint8Array) => {
            
              if (origin === 'remote') return 
            const base64 = btoa(String.fromCharCode(...update))
            sendMessage("YJS_UPDATE", { roomId, update: base64 })
        }

        //it will send the awarness of the local user 
        const awarenessUpdateHandler = () => {
            // encode only local client's awareness state
           
            const update = encodeAwarenessUpdate(awareness, [ydocRef.current.clientID])
            const base64 = btoa(String.fromCharCode(...update))
            sendMessage("AWARENESS_UPDATE", { roomId, update: base64 })
        }


         ydocRef.current.on('update', docUpdateHandler)
        awareness.on('change', awarenessUpdateHandler)

        return () => {
            ydocRef.current.off('update', docUpdateHandler)
            awareness.off('change', awarenessUpdateHandler)
            awareness.destroy()
            ydocRef.current.destroy()
        }


    },[])

    const applyRemoteUpdate = (base64: string) => {
        const update = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
       Y.applyUpdate(ydocRef.current, update, 'remote')
    }

    const applyRemoteAwareness = (base64: string) => {
        const update = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        applyAwarenessUpdate(awarenessRef.current, update, null)
    }

    return { ytext, awareness: awarenessRef.current, applyRemoteUpdate, applyRemoteAwareness }

   
}