import { WebSocket } from "ws";

export function broadcastMessage(innerMap:Map<WebSocket,string> | undefined,data:object)
{   const dataStr=JSON.stringify(data) ;

     for(const [socket,userName] of innerMap!)
     {   
          socket.send(dataStr) ;
     }
}