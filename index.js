// IMPORTS -------------------------------------------------------------------------------------------------------------
const http = require('http');
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');

// APP -----------------------------------------------------------------------------------------------------------------
const app = express();
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

// MIDDLEWARE ----------------------------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ROUTES --------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// SOCKET.IO -----------------------------------------------------------------------------------------------------------
ioServer.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// SERVER --------------------------------------------------------------------------------------------------------------
httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});