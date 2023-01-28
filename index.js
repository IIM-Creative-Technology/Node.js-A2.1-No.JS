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


app.get('/user', (req, res) => {
    res.send('Lecture  de tous les users');
});

app.get('/user/:id', (req, res) => {
    res.send('Lecture d un user');
});

app.put('/user/:id', (req, res) => {
    res.send('mise à jour d un user');
});

app.post('/user', (req, res) => {
    res.send('insertion d un user');
});

app.delete('/user/:userId', (req, res) => {
    res.send('suppression d un user');
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