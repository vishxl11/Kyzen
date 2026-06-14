import { getUserMap } from "../../state/room.js";
import type { LanguageChanged } from "../../types/protocol.js";
import WebSocket from "ws";
import CreateMessage from "../../utils/createMessage.js";
import { broadcastMessage } from "../../utils/broadcastMessage.js";

export default function languageChanged( parsedJson:LanguageChanged,socket:WebSocket)
{
     const roomId=parsedJson.payload.roomId ;
     const language=parsedJson.payload.language ;

    const innerMap=getUserMap(roomId) ;

    const languageMessage=CreateMessage("LANGUAGE_CHANGED",{
        roomId:roomId,
        language:language 
    }) 

    broadcastMessage(innerMap,languageMessage,socket) ;

     
}