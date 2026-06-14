import type { RunCode } from "../../types/protocol.js";
import codeExecution from "../../docker/executioner.js";
import CreateMessage from "../../utils/createMessage.js";
import { broadcastMessage } from "../../utils/broadcastMessage.js";
import { getUserMap } from "../../state/room.js";
import { executionQueue } from "../../queue/queue.js";


export default async function runCode(message:RunCode)
{
    const roomId=message.payload.roomId ;
    const language=message.payload.language ;
    const code=message.payload.code ;
    const input=message.payload.input ;

    const executionStartedMessage=CreateMessage("EXECUTION_STARTED",{roomId:roomId}) ;
    broadcastMessage(getUserMap(roomId),executionStartedMessage) ;

    console.log("job added to queue")

        executionQueue.add('run', {
        code,
        language,
        input,
        roomId
    })

   

     
}