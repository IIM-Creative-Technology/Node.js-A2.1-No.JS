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
    res.send('<h1>Hello World !</h1>')
});

// SOCKET.IO -----------------------------------------------------------------------------------------------------------
ioServer.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    //PixelWar
    socket.on('newCell', (data)=>{
        console.log(data)
        //TODO : insérer dans la base de données
        ioServer.emit('globalCell', {msg: "Cell Changed", cell_data: data})
    })
});

// SERVER --------------------------------------------------------------------------------------------------------------
httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});