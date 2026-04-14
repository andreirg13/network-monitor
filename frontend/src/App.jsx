import { useState, useEffect } from "react";


function App() {
  const [packets, setPackets] = useState([])
  useEffect(() => {
    const connection = new WebSocket("ws://localhost:8000/ws")

    connection.onmessage = (event) => {setPackets(prev => [...prev, JSON.parse(event.data)])}
  }, [])
  const IPlist = packets.map((packet, index) => <li key={`${packet.source_ip} - ${packet.timestamp}`}>{packet.source_ip}</li>)
  return (
    <div>
      <ul>
        {IPlist}
      </ul>
    </div>
  )
}

export default App