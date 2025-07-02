// Establish WebSocket connection to Binance for BTC/USDT trades
const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

// Accumulates trade volume over the current 5 second interval
let currentVolume = 0;

// Chart.js setup
const ctx = document.getElementById('volumeChart');
const data = {
    labels: [],
    datasets: [{
        label: 'Volume (BTC)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
};
const chart = new Chart(ctx, {
    type: 'bar',
    data,
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'BTC' } }
        }
    }
});

// Listen for trade events
socket.onmessage = event => {
    const trade = JSON.parse(event.data);
    currentVolume += parseFloat(trade.q); // q = quantity of BTC
};

// Every 5 seconds update display and chart
setInterval(() => {
    const now = new Date();
    const label = now.toLocaleTimeString();

    // Update current volume text
    document.getElementById('current-volume').textContent = currentVolume.toFixed(6);

    // Push data to chart
    data.labels.push(label);
    data.datasets[0].data.push(currentVolume);

    // Keep last 20 data points
    if (data.labels.length > 20) {
        data.labels.shift();
        data.datasets[0].data.shift();
    }

    chart.update();
    currentVolume = 0; // Reset volume for next interval
}, 5000);

// Log errors for debugging
socket.onerror = err => {
    console.error('WebSocket error:', err);
};
