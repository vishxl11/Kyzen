import * as Y from 'yjs' 
import type { YjsUpdate } from '../../types/protocol.js';
import { getUserMap, getYDoc } from '../../state/room.js';
import { broadcastMessage } from '../../utils/broadcastMessage.js';
import CreateMessage from '../../utils/createMessage.js';
import { WebSocket } from 'ws';


export default function yjsUpdate(socket:WebSocket,parsedJson:YjsUpdate)
{
    
    const roomId=parsedJson.payload.roomId ;
    

    const update=new Uint8Array(Buffer.from(parsedJson.payload.update,'base64')) ;

    const ydoc=getYDoc(roomId) ;
    if (!ydoc) return

    Y.applyUpdate(ydoc, update) ;

    const base64 = Buffer.from(update).toString('base64')
    
    const innerMap=getUserMap(roomId)

    const message=CreateMessage("YJS_UPDATE",{
        roomId:roomId,
        update:base64 
    })

    broadcastMessage(innerMap,message,socket) ;

}