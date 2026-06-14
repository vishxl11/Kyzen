import { Worker } from 'bullmq'
import { execute } from '../docker/language.js'
import { broadcastMessage } from '../utils/broadcastMessage.js'
import { getUserMap } from '../state/room.js'
import CreateMessage from '../utils/createMessage.js'
import codeExecution from '../docker/executioner.js'


const worker = new Worker('code-execution', async (job) => {
     console.log("job picked up:", job.data)
    const { code, language, input, roomId } = job.data

    const executionOut = await codeExecution( language,code, input)

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



}, {
    connection: {
        host: 'localhost',
        port: 6379
    },
    concurrency: 3  // max 3 jobs running simultaneously
})














 