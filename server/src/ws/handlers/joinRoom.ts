import { getUserMap,getUsers,roomState } from "../../state/room.js";
import CreateMessage from "../../utils/createMessage.js";
import sendMessage from "../../utils/sendMessaage.js";
import { broadcastMessage } from "../../utils/broadcastMessage.js";
import type { JoinRoom } from "../../types/protocol.js";
import { WebSocket } from "ws";


export default function joinRoom(socket:WebSocket,parsedJson:JoinRoom)
{
           roomState(parsedJson,socket) ;

              // add the single joined user message 
              // broadcast message also getuser function 
                
              const innerMap=getUserMap(parsedJson.payload.roomId) ;
              const connectedUsers=getUsers(parsedJson.payload.roomId) ;
              
              //Message to the joined user 
               const joinedUserMessage= CreateMessage('SESSION_JOINED',{
                    roomId:parsedJson.payload.roomId ,
                    connectedUsers:connectedUsers
                })

                sendMessage(socket,joinedUserMessage) ;

                // BroadCast to all connected users 
                const allUsersMessage=CreateMessage('USER_JOINED',
                    {
                        userName:parsedJson.payload.userName ,
                        connectedUsers:connectedUsers
                    }
                )

                broadcastMessage(innerMap,allUsersMessage) ;


}