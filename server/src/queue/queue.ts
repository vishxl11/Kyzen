import { Queue } from 'bullmq'

export const executionQueue = new Queue('code-execution', {
    connection: {
        host: 'localhost',
        port: 6379
    }
})