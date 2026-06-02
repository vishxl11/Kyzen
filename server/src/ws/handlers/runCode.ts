import type { RunCode } from "../../types/protocol.js";
import codeExecution from "../../docker/executioner.js";
import CreateMessage from "../../utils/createMessage.js";
import { broadcastMessage } from "../../utils/broadcastMessage.js";
import { getUserMap } from "../../state/room.js";

export default async function runCode(message:RunCode)
{
    const roomId=message.payload.roomId ;
    const language=message.payload.language ;
    const code=message.payload.code ;
    const input=message.payload.input ;

    const executionStartedMessage=CreateMessage("EXECUTION_STARTED",{roomId:roomId}) ;
    broadcastMessage(getUserMap(roomId),executionStartedMessage) ;

    const executionOut=await codeExecution(language,code,input) ;

    if(executionOut.statusCode==0)
    {
        const message= CreateMessage('EXECUTION_RESULT',{
            status:'success',
            output:executionOut.executionOut ,
            error:"",
            executionTime:executionOut.executionTime
         })

           const innerMap=getUserMap(roomId) ;

         broadcastMessage(innerMap,message) ;
    }
    else if(executionOut.statusCode==-1)
    {
         const message= CreateMessage('EXECUTION_RESULT',{
            status:'timeout',
            output:"" ,
            error:"Timeout",
            executionTime:executionOut.executionTime
         })

           const innerMap=getUserMap(roomId) ;

         broadcastMessage(innerMap,message) ;
    }
    else
    {
        const message= CreateMessage('EXECUTION_RESULT',{
            status:'error',
            output:"" ,
            error:executionOut.executionOut,
            executionTime:executionOut.executionTime
         })
         const innerMap=getUserMap(roomId) ;

         broadcastMessage(innerMap,message) ;
    }

     
}