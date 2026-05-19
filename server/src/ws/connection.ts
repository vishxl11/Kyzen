import{WebSocket,WebSocketServer} from 'ws' ;
import CreateMessage from '../utils/createMessage.js'
import sendMessage from '../utils/sendMessaage.js';
import validateMessage from '../utils/validateMessage.js';
import joinRoom from './handlers/joinRoom.js';
import { closeRoom } from './handlers/closeRoom.js';

function connect(wss:WebSocketServer)
{
     wss.on("connection",(socket)=>{

        console.log("connected to the user") ;

        //handle the messages

        socket.on("message",(data)=>{

            let msgStr=data.toString() ;
            let parsedJson=null ;

            try{

            parsedJson=JSON.parse(msgStr) ;

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

            
            // handle the actual type 

            if(parsedJson.type=='JOIN_ROOM')
            {
               joinRoom(socket,parsedJson) ; 
            }
            else
            {

            }


            

        })


        socket.on("close",(code,reason)=>{
            //when user leaves the room 

             closeRoom(socket) ;
        })




     })
}

export default connect ;