// server/src/index.ts
import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server })

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

wss.on('connection', (ws) => {
  console.log('client connected')
  
  ws.on('message', (data) => {
    console.log('received:', data.toString())
    ws.send(JSON.stringify({ type: 'ACK' }))
  })
  
  ws.on('close', () => {
    console.log('client disconnected')
  })
})

server.listen(8080, () => {
  console.log('running on port 8080')
})