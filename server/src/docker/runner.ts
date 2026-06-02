import Docker from 'dockerode'

const docker = new Docker()


export async function runCpp(code: string,input:string) {
   let executionOut="" ;

  const container = await docker.createContainer({
    Image: 'gcc',
    Cmd: ['sh', '-c', `echo '${Buffer.from(code).toString('base64')}' | base64 -d > /tmp/s.cpp && g++ /tmp/s.cpp -o /tmp/out && echo '${Buffer.from(input).toString('base64')}' | base64 -d | /tmp/out`],
    AttachStdout: true,
    AttachStderr: true,
    HostConfig: {
    Memory: 128 * 1024 * 1024,  // 128MB
    CpuPeriod: 100000,
    CpuQuota: 50000,             // 50% of one CPU core
    NetworkMode: 'none',         // no internet access
    PidsLimit: 50,               // prevent fork bombs
            }
  })

  await container.start()
   const startTime = Date.now()

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  })

return await collectOutput(container,executionOut,startTime,logs) ;

}

export async function runPython(code:string,input:string)
{     let executionOut="" ;
      const container = await docker.createContainer({
    Image: 'python:3.11-slim',
     Cmd:['sh', '-c', `echo '${Buffer.from(input).toString('base64')}' | base64 -d | python3 -c "$(echo '${Buffer.from(code).toString('base64')}' | base64 -d)"`],
    AttachStdout: true,
    AttachStderr: true,
      HostConfig: {
    Memory: 128 * 1024 * 1024,  // 128MB
    CpuPeriod: 100000,
    CpuQuota: 50000,             // 50% of one CPU core
    NetworkMode: 'none',         // no internet access
    PidsLimit: 50,               // prevent fork bombs
            }
  })

  await container.start()
   const startTime = Date.now()

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  })

  return await collectOutput(container,executionOut,startTime,logs) ;


}

export async function runJavascript(code:string,input:string)
{      let executionOut="" ;
      const container = await docker.createContainer({
    Image: 'node:18-slim',
   Cmd:['sh', '-c', `echo '${Buffer.from(input).toString('base64')}'| base64 -d | node -e "$(echo '${Buffer.from(code).toString('base64')}' | base64 -d)"`],
    AttachStdout: true,
    AttachStderr: true,
      HostConfig: {
    Memory: 128 * 1024 * 1024,  // 128MB
    CpuPeriod: 100000,
    CpuQuota: 50000,             // 50% of one CPU core
    NetworkMode: 'none',         // no internet access
    PidsLimit: 50,               // prevent fork bombs
            }
  })

  await container.start()
  const startTime=Date.now() ;

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  })

return await collectOutput(container,executionOut,startTime,logs) ;;

}

function collectOutput(container:Docker.Container,executionOut:string,startTime:number,logs:NodeJS.ReadableStream)
{   let timeoutRef:NodeJS.Timeout
    let isResolved = false
    const codeRunningPromise:Promise<{executionOut: string, statusCode: number, executionTime: number}>=new Promise((resolve, reject) => {
    logs.on('data', (chunk) => {
       executionOut += chunk.slice(8).toString().replace(/[^\x20-\x7E\n\r\t]/g, '')
    })
    
    logs.on('end', async () => {
        const executionTime = Date.now() - startTime
        if(isResolved) return 
        clearTimeout(timeoutRef)
        const statusObject = await container.wait()
      try { await container.remove() } catch(e) {}

       resolve({ executionOut, statusCode: statusObject.StatusCode, executionTime })
    })

    logs.on('error', reject)
})

    const timeLimitExceeded:Promise<{executionOut:string,statusCode:number,executionTime:number}>=new Promise((resolve,reject)=>{
       timeoutRef=setTimeout(async ()=>{
            isResolved = true 
           try { await container.stop() } catch(e) {}
        try { await container.remove() } catch(e) {}

             resolve({
            executionOut:"",
            statusCode: -1,
            executionTime: 10000
        });

        },10000)
    }) 


    return Promise.race([codeRunningPromise,timeLimitExceeded]) ;
}


