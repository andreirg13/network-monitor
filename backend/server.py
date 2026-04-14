from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
from traffic_simulator import generate_traffic

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            packet = generate_traffic()
            await websocket.send_json(packet)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("Client disconnected")