import { useCallback, useEffect, useState } from "react"

export default function Home() {
  const [count, setCount] = useState<null | number>(null)
  const [disconnected, setDisconnected] = useState<boolean>(false)
  const [ws, setWS] = useState<null | WebSocket>(null)
  const countCount = useCallback(() => {
    if (!ws) return
    if (!ws.OPEN) return

    ws.send("ADD")
  }, [ws])

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.addEventListener("open", () => {
      console.log("Connected to the websocket server")
    })

    ws.addEventListener("close", () => setDisconnected(true))
    ws.addEventListener("error", () => setDisconnected(true))

    ws.addEventListener("message", (message) => {
      const [event, value] = String(message.data).split(" ")

      if (!isNaN(Number(value))) setCount(Number(value))
    })

    setWS(ws)
  }, [])

  return disconnected ? (
    <div className="h-screen flex flex-col items-center justify-center font-pretendard">
      <p className="text-4xl font-bold">
        Disconnected! try refreshing to reconnect to the server
      </p>
      <p className="text-3xl font-medium mt-4">
        ...Or maybe the server is down?
      </p>
    </div>
  ) : (
    <div
      className="h-screen w-full relative flex flex-col items-center justify-center cursor-pointer"
      onClick={() => countCount()}
    >
      <div className="text-center">
        {count ? (
          <p className="text-5xl font-bold cursor-default select-none">
            Counts: {count}
          </p>
        ) : (
          <p className="text-5xl font-bold">Loading...</p>
        )}
      </div>
      <div className="mt-6">
        <p className="text-2xl cursor-default select-none">
          Click anywhere to count
        </p>
      </div>
    </div>
  )
}
