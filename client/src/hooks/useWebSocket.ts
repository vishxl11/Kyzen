import { useCallback, useEffect, useRef } from "react"
import type { ServerMessage } from "../types/protocol"
import CreateMessage from "../utils/CreateMessage";

export default function useWebSocket(roomId:string,userName:string,messageHandler:( message:ServerMessage)=>void)
{
    const wsRef=useRef<WebSocket|null>(null) ;
        const messageHandlerRef = useRef(messageHandler);
    useEffect(() => {
        messageHandlerRef.current = messageHandler;
    }, [messageHandler]);

    useEffect(()=>{
        const ws=new WebSocket("ws://localhost:8080") ;
        wsRef.current=ws;

         ws.onopen = () => {

            const joinRoomMessage=CreateMessage("JOIN_ROOM",{
                roomId:roomId ,
                userName:userName 
            })

            ws.send(JSON.stringify(joinRoomMessage)) ;
      
        };

        ws.onmessage=(e) => {
            const incomingMessage:ServerMessage=JSON.parse(e.data);
            messageHandlerRef.current(incomingMessage) ;
        } ;

        return () => {
            ws.close();
            };

    },[roomId,userName]) ;

    const sendMessage=useCallback((type:string,payload:object)=>{

        if(wsRef.current?.readyState==WebSocket.OPEN)
        {
            const outgoingMessage=CreateMessage(type,payload) ;
            wsRef.current.send(JSON.stringify(outgoingMessage)) ;
        }
        


    },[])

    return sendMessage ;
}