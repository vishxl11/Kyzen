import{WebSocket,WebSocketServer} from 'ws' ;
import CreateMessage from '../utils/createMessage.js'
import sendMessage from '../utils/sendMessaage.js';
import validateMessage from '../utils/validateMessage.js';
import joinRoom from './handlers/joinRoom.js';
import { closeRoom } from './handlers/closeRoom.js';
import runCode from './handlers/runCode.js';
import yjsUpdate from './handlers/yjsUpdate.js';
import awarenessUpdateHandler from './handlers/awarenessUpdate.js';
import languageChanged from './handlers/languageChanged.js';

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
            else if(parsedJson.type=="YJS_UPDATE")
            {   
               yjsUpdate(socket,parsedJson) ;
            }
            else if(parsedJson.type=="AWARENESS_UPDATE")
            {
                awarenessUpdateHandler(socket,parsedJson) ;
            }
            else if(parsedJson.type=="RUN_CODE")
            {
                 runCode(parsedJson) ;
            }
            else if(parsedJson.type=="LANGUAGE_CHANGED")
            {   
                 languageChanged(parsedJson,socket) ;
            }
            else
            {
                 socket.send("wrong message formatt")
            }


            

        })


        socket.on("close",(code,reason)=>{
            //when user leaves the room 

             closeRoom(socket) ;
        })




     })
}

export default connect ;