const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
    console.log('connected');
    ws.send('Hello Server!');
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});

ws.on('error', function error(err) {
    console.error('WebSocket error: ', err);
});

ws.on('close', function close() {
    console.log('disconnected');
});
