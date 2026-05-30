import { WebSocket } from "ws"
import type{JoinRoom} from "../types/protocol.js"
import { join } from "path";
import * as Y from "yjs" ;
import { Awareness } from "y-protocols/awareness";

type Room = {
  users: Map<WebSocket, string>  // socket → userName, same as before
  ydoc: Y.Doc
  awareness:Awareness
}

let joinedUsers=new Map<string, Room>() ;


export function roomState(message:JoinRoom,socket:WebSocket)
{
     const userName=message.payload.userName ;
     const roomId=message.payload.roomId ;

     if(!joinedUsers.has(roomId))
     {    
          const ydoc = new Y.Doc()
         const awareness = new Awareness(ydoc)

          const newRoom={
               users:new Map() ,
               ydoc:ydoc ,
               awareness:awareness 
          }

         joinedUsers.set(roomId,newRoom) ;
     }

     joinedUsers.get(roomId)!.users.set(socket,userName) ;

     console.log(`${userName} joined the ${roomId}`) ;

}

export function getUserMap(roomId:string)
{
     const innerMap=joinedUsers.get(roomId)!.users ;
     return innerMap ;
}

export function getUsers(roomId:string)
{
     let users=[] ;

     for(const [socket,userName] of joinedUsers.get(roomId)!.users)
     {
          users.push(userName) ;
     }

      return users ;
}

export function releaseUser(socket:WebSocket)
{
     for(const [key,value] of joinedUsers)
     {
         for(const [userSocket,userName] of value.users)
         {
              if(userSocket==socket)
              {
                  joinedUsers.get(key)!.users.delete(userSocket) ;

                  return {
                        roomId:key ,
                        userName:userName
                  }
              }
         }
     }
}

export function getYDoc(roomId:string)
{
      return joinedUsers.get(roomId)!.ydoc ;
}

export function getAwarenessDoc(roomId:string)
{
      return joinedUsers.get(roomId)!.awareness ;
}
