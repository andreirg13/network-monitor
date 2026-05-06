import { useState, useEffect } from "react";


function App() {
  const [packets, setPackets] = useState([])
  const [analysis, setAnalysis] = useState(null)
  useEffect(() => {
    const connection = new WebSocket("ws://localhost:8000/ws")

   

    connection.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setPackets(prev => [...prev, ...message.packets])
      const parsedAnalysis = JSON.parse(message.analysis)
      setAnalysis(parsedAnalysis)

    }

  }, [])
  const IPlist = packets.map((packet, index) => <li key={`${packet.source_ip} - ${packet.timestamp}`}>{packet.source_ip}</li>)
  const analysisMessage = analysis ? (
    <div>
        <p>Threat Level: {analysis.threat_level}</p>
        <p>Reason: {analysis.reason}</p>
        <p>Suspicious IPs: {analysis.suspicious_ips.join(", ")}</p>
        <p>Recommended Actions: {analysis.recommended_actions}</p>
    </div>
) : null
  return (
    <div>
      <ul>
        {IPlist}
      </ul>
      {analysisMessage}
    </div>
  )
}

export default App