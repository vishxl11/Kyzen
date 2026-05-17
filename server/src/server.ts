// server/src/index.ts
import express from 'express'
import { createServer } from 'http'
import { WebSocketServer ,WebSocket} from 'ws'
import connect from './ws/connection.js'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server })

connect(wss) ;


server.listen(8080, () => {
  console.log('running on port 8080')
})