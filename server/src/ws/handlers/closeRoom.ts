import { WebSocket } from "ws";
import { getUserMap, getUsers, releaseUser } from "../../state/room.js";
import CreateMessage from "../../utils/createMessage.js";
import { broadcastMessage } from "../../utils/broadcastMessage.js";
export function closeRoom(socket:WebSocket)
{
     const userInfo=releaseUser(socket)! ;
     const innerMap=getUserMap(userInfo.roomId) ;
     const userArray=getUsers(userInfo.roomId) ;
     const userLeftMessage=CreateMessage('USER_LEFT',{
        userName:userInfo.userName ,
        connectedUsers : userArray 
     }) ;

     broadcastMessage(innerMap,userLeftMessage) ;
}