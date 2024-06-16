import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8080/"

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {   
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => {
            console.log("connected")
        }
        ws.onclose = () => {
            console.log("disconnected")
        }
        setSocket(ws)
        return () => {
            ws.close();
        }
    }
    , [WS_URL])

  return socket;
}

