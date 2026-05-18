import { WebSocket } from "ws"
import type{JoinRoom} from "../types/protocol.js"


let joinedUsers=new Map<string, Map<WebSocket,string>>() ;


export  function roomState(message:JoinRoom,socket:WebSocket)
{
     const userName=message.payload.userName ;
     const roomId=message.payload.roomId ;

     if(!joinedUsers.has(roomId))
     {
         joinedUsers.set(roomId,new Map()) ;
     }

     joinedUsers.get(roomId)!.set(socket,userName) ;

     console.log(`${userName} joined the ${roomId}`) ;

}

