
import { execute } from "./language.js";
export default async function codeExecution(language:string,code:string,input:string)
{
    const executionOut=await execute(language,code,input) ;
    return executionOut ;
   

  
}