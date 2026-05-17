import{WebSocket,WebSocketServer} from 'ws' ;

function connect(wss:WebSocketServer)
{
     wss.on("connection",(socket)=>{

        console.log("connected to the user") ;

        //handle the messages

        socket.on("message",(data)=>{

            try{

            }
            catch(e)
            {
                
            }

        })




     })
}

export default connect ;