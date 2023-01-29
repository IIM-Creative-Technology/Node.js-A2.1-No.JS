// IMPORTS -------------------------------------------------------------------------------------------------------------
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const db = require("./database.js");


// APP -----------------------------------------------------------------------------------------------------------------
const app = express();
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

db.GetAllUser();


// MIDDLEWARE ----------------------------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ROUTES --------------------------------------------------------------------------------------------------------------

/* routes users */
app.get('/user', (req, res) => {
    
    res.send(db.GetAllUser());
});

app.get('/user/:id', (req, res) => {
    res.send(db.GetDataUserById(req.params.id));
});

app.post('/user', (req, res) => {
    res.send(db.AddUserToDatabase(req.body.FisrtName, req.body.LastName, req.body.Password, req.body.Pseudo));
});

app.put('/user/:id', (req, res) => {
    res.send(db.UpdateUserDataById(req.params.id, req.body.FisrtName, req.body.LastName, req.body.Password, req.body.Pseudo))
});


app.delete('/user/:id', (req, res) => {
    res.send(db.DeleteUserById(req.params.id));
});

/* routes messages */
app.get('/message', (req, res) => {
    res.send(db.GetAllMessage());
});

app.get('/message/:id', (req, res) => {
    res.send(db.GetDataMessageById(req.params.id));
});

app.post('/message/:id', (req, res) => {
    res.send(db.AddMessageToDatabase(req.body.Message, req.body.Pseudo, req.body.Date));
});

app.delete('/message/:id', (req, res) => {
    res.send(db.DeleteMessageById(req.params.id));
});

/* routes pixels */
app.get('/pixel', (req, res) => {
    res.send('Lecture de la grille de pixels');
});

app.put('/pixel', (req, res) => {
    res.send('mise à jour d un pixel');

});

// SOCKET.IO -----------------------------------------------------------------------------------------------------------
ioServer.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// SERVER --------------------------------------------------------------------------------------------------------------
httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
 

});
db.GetAllMessage();