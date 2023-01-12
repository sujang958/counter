import WebSocket, { WebSocketServer } from "ws"
import { countRef } from "./firebase"

const ws = new WebSocketServer({ port: 8080 })

enum Event {
  Add = "ADD",
  Added = "ADDED",
  Current = "CURRENT",
}

ws.on("listening", () => {
  console.log("the server is up")
})

ws.on("connection", async (connection) => {
  connection.send(`${Event.Current} ${(await countRef.get()).val()}`)

  connection.on("message", async (data) => {
    const event = data.toString("utf8").toUpperCase()

    if (event == Event.Add) {
      const count: number = (await countRef.get()).val()
      await countRef.set(count + 1)
    }
  })
})

countRef.on("value", (snapshot) => {
  broadcast(`${Event.Added} ${snapshot.val()}`)
})

const broadcast = (data: any) => {
  ws.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(String(data))
  })
}
