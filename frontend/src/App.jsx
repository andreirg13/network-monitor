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
  const IPlist = packets.map((packet, index) => <tr key={`${packet.source_ip} - ${packet.timestamp}`}>
    <td>{packet.source_ip}</td>
    <td>{packet.timestamp}</td>
    <td>{packet.bytes}</td>
    <td>{packet.protocol}</td>
  </tr>)
  
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
      <table>
        <thead>Packets</thead>
        <tbody>
          <tr>
            <th>Source IP</th>
            <th>Timestamp</th>
            <th>Bytes</th>
            <th>Protocol</th>
          </tr>
          {IPlist}
          
        </tbody>
      </table>
      
      {analysisMessage}
    </div>
  )
}

export default App