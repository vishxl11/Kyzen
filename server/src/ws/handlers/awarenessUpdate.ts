import * as Y from 'yjs' 
import type { awarenessUpdate } from '../../types/protocol.js';
import { getUserMap, getAwarenessDoc } from '../../state/room.js';
import { broadcastMessage } from '../../utils/broadcastMessage.js';
import CreateMessage from '../../utils/createMessage.js';
import { WebSocket } from 'ws';
import { applyAwarenessUpdate } from 'y-protocols/awareness.js';


export default function awarenessUpdateHandler(socket:WebSocket,parsedJson:awarenessUpdate)
{
    const roomId=parsedJson.payload.roomId ;
    

    const update = new Uint8Array(Buffer.from(parsedJson.payload.update, 'base64'))


    const awarenessDoc=getAwarenessDoc(roomId) ;
    if (!awarenessDoc) return

    applyAwarenessUpdate(awarenessDoc, update, socket)

    const base64 = Buffer.from(update).toString('base64')
    
    const innerMap=getUserMap(roomId)

    const message=CreateMessage("AWARENESS_UPDATE",{
        roomId:roomId,
        update:base64 
    })

    broadcastMessage(innerMap,message,socket) ;

}