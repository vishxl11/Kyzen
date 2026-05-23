import Docker from 'dockerode'

const docker = new Docker()


export async function runCpp(code: string,input:string) {
   let executionOut="" ;

  const container = await docker.createContainer({
    Image: 'gcc',
    Cmd: ['sh', '-c', `echo '${Buffer.from(code).toString('base64')}' | base64 -d > /tmp/s.cpp && g++ /tmp/s.cpp -o /tmp/out && echo '${Buffer.from(input).toString('base64')}' | base64 -d | /tmp/out`],
    AttachStdout: true,
    AttachStderr: true,
  })

  await container.start()
   const startTime = Date.now()

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  })

return new Promise<{executionOut: string, statusCode: number,executionTime:number}>((resolve, reject) => {
    logs.on('data', (chunk) => {
        executionOut += chunk.slice(8).toString()
    })
    
    logs.on('end', async () => {
        const executionTime = Date.now() - startTime
        const statusObject = await container.wait()
        await container.remove()
       resolve({ executionOut, statusCode: statusObject.StatusCode, executionTime })
    })

    logs.on('error', reject)
})
}

export async function runPython(code:string,input:string)
{     let executionOut="" ;
      const container = await docker.createContainer({
    Image: 'python:3.11-slim',
     Cmd:['sh', '-c', `echo '${Buffer.from(input).toString('base64')}' | base64 -d | python3 -c "$(echo '${Buffer.from(code).toString('base64')}' | base64 -d)"`],
    AttachStdout: true,
    AttachStderr: true,
  })

  await container.start()
   const startTime = Date.now()

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  })

 return new Promise<{executionOut: string, statusCode: number,executionTime:number}>((resolve, reject) => {
    logs.on('data', (chunk) => {
        executionOut += chunk.slice(8).toString()
    })
    
    logs.on('end', async () => {
         const executionTime = Date.now() - startTime
        const statusObject = await container.wait()
        await container.remove()
        resolve({ executionOut, statusCode: statusObject.StatusCode, executionTime })
    })

    logs.on('error', reject)
})
}

export async function runJavascript(code:string,input:string)
{      let executionOut="" ;
      const container = await docker.createContainer({
    Image: 'node:18-slim',
   Cmd:['sh', '-c', `echo '${Buffer.from(input).toString('base64')}'| base64 -d | node -e "$(echo '${Buffer.from(code).toString('base64')}' | base64 -d)"`],
    AttachStdout: true,
    AttachStderr: true,
  })

  await container.start()
  const startTime=Date.now() ;

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  })

return new Promise<{executionOut: string, statusCode: number,executionTime:number}>((resolve, reject) => {
    logs.on('data', (chunk) => {
        executionOut += chunk.slice(8).toString()
    })
    
    logs.on('end', async () => {
       const executionTime=Date.now()-startTime ;
        const statusObject = await container.wait()
        await container.remove()
         resolve({ executionOut, statusCode: statusObject.StatusCode, executionTime })
    })

    logs.on('error', reject)
})

}




