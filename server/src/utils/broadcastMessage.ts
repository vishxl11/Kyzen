import { WebSocket } from "ws";

export function broadcastMessage(innerMap:Map<WebSocket,string> | undefined,data:object,except: WebSocket | null = null)
{   const dataStr=JSON.stringify(data) ;

     for(const [socket,userName] of innerMap!)
     {   
          if(except && socket==except)
          {
               continue ;
          }
          
          socket.send(dataStr) ;
     }
}