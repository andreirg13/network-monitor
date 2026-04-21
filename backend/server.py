from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
from traffic_simulator import generate_traffic
from agent import analyze_packets

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        batch_size = 10
        batch = []
        while True:
            packet = generate_traffic()
            batch.append(packet)
            if len(batch) >= batch_size:
                analysis = await asyncio.to_thread(analyze_packets, batch)
                await websocket.send_json({
                    "packets": batch,
                    "analysis": analysis
                })
                batch = []
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("Client disconnected")