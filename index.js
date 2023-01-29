// IMPORTS -------------------------------------------------------------------------------------------------------------
const http = require('http');
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
const jwt = require("jsonwebtoken");

// APP -----------------------------------------------------------------------------------------------------------------
const app = express();
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

// VAR -----------------------------------------------------------------------------------------------------------------
const secretKey = "secret-key";

// MIDDLEWARE ----------------------------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ROUTES --------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Authentification
    //const user = authenticateUser(username, password);
    const user = true;

    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login successful", "token":token });

    // if (user) {
    //     const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
    //     res.send({ message: "Login successful", token });
    // } else {
    //     res.status(401).send({ message: "Incorrect username or password" });
    // }
});

app.post("/logout", (req, res) => {
    // You do not need to implement logout in JWT-based authentication
    res.send({ message: "Logout successful", destroyToken : true });
});


app.use((req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
    return res.status(401).send({ message: "Access denied" });
    }
    
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid token" });
    }
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