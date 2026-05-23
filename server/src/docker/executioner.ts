import { execute } from "./language.js";
export default async function codeExecution(language:string,code:string,input:string)
{
    const executionOut=await execute(language,code,input) ;
    return executionOut ;
     //we still have to do the timeout and tle handling code 
}