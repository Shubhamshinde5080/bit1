# Bitcoin Volume Viewer

This repository contains a simple web page that displays real-time Bitcoin (BTCUSDT) trade volume using data from the Binance WebSocket API.

## Features
- Live connection to the Binance WebSocket endpoint `wss://stream.binance.com:9443/ws/btcusdt@trade`.
- The page updates every 5 seconds with the total traded volume for that interval.
- A responsive chart built with Chart.js visualizes recent volume history.

## Usage
Open `index.html` in any modern web browser. The page will automatically connect to Binance, display the latest volume, and update the chart continuously.

Internet access is required for the WebSocket connection and for loading the Chart.js CDN script.
