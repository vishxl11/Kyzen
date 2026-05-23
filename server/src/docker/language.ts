import { runCpp, runJavascript, runPython } from "./runner.js";

export async function execute(language:string,code:string,input:string)
{
     if(language=="cpp")
     {
        return await runCpp(code,input) ;
        
     }
     else if(language=="javascript")
     {
         return runJavascript(code,input) ;
     }
     else 
     {
        return runPython(code,input) ;
     }
}