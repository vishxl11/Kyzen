import { WebSocket } from "ws"
import type{JoinRoom} from "../types/protocol.js"
import { join } from "path";


let joinedUsers=new Map<string, Map<WebSocket,string>>() ;


export function roomState(message:JoinRoom,socket:WebSocket)
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

export function getUserMap(roomId:string)
{
     const innerMap=joinedUsers.get(roomId) ;
     return innerMap ;
}

export function getUsers(roomId:string)
{
     let users=[] ;

     for(const [socket,userName] of joinedUsers.get(roomId)!)
     {
          users.push(userName) ;
     }

      return users ;
}

export function releaseUser(socket:WebSocket)
{
     for(const [key,value] of joinedUsers)
     {
         for(const [userSocket,userName] of value)
         {
              if(userSocket==socket)
              {
                  joinedUsers.get(key)!.delete(userSocket) ;

                  return {
                        roomId:key ,
                        userName:userName
                  }
              }
         }
     }
}
