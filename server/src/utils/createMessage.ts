import type{Message} from '../types/protocol.js'

export default function CreateMessage<T extends object>(currType:string,currPayload:T):Message<T,string>
{

    return{
     type:currType ,
    timestamp:Date.now(),
    payload:currPayload
    } ;

}