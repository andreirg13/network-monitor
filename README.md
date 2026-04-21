# Network Traffic Monitor

## What is this?
An application that monitors traffic and makes note of any IP address that raises suspicion on its bandwidth use

## Tech stack
Backend uses websockets, and FastAPI
Front end uses React

## How to use it
### Backend

cd ~/network-monitor/backend
source venv/bin/activate
uvicorn server:app --reload
### Frontend
cd ~/network-monitor/frontend
npm run dev

## File Structure
traffic_simulator.py - generates fake IP packets and returns it
server.py - establishes the WebSocket connection and continuously calls the packet generator and sends it through the connection
App.jsx - Displays the IP addresses 

## What's next?
 - Suspicious activity detection using yellow and red flags
 - Live traffic graph
 - Top 5 IPs by bandwidth
 - Protocol breakdown