import{WebSocket,WebSocketServer} from 'ws' ;
import CreateMessage from '../utils/createMessage.js'
import sendMessage from '../utils/sendMessaage.js';
import validateMessage from '../utils/validateMessage.js';

function connect(wss:WebSocketServer)
{
     wss.on("connection",(socket)=>{

        console.log("connected to the user") ;

        //handle the messages

        socket.on("message",(data)=>{

            let msgStr=data.toString() ;

            try{

            let parsedJson=JSON.parse(msgStr) ;

            if(!validateMessage(parsedJson))
            {
                let errorPayload={ message:"invalid input message" }  
               sendMessage(socket,CreateMessage('ERROR',errorPayload)) ;   
               return ;  
            }

            }
            catch(e)
            {   
                let errorPayload={ message:"invalid json" }  
               sendMessage(socket,CreateMessage('ERROR',errorPayload)) ;   
               return ;  
            }

        })




     })
}

export default connect ;