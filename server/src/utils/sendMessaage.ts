import { WebSocket } from "ws";

export default function sendMessage(socket:WebSocket,msg:object)
{  const msgstring=JSON.stringify(msg) ;
     socket.send(msgstring) ;
}