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




// MIDDLEWARE ----------------------------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ROUTES --------------------------------------------------------------------------------------------------------------

/* routes users */
app.get("/user", (req, res) => {
  db.GetAllUser(function (user) {
    res.json(user);
  });
});

app.get('/user/:id', (req, res) => {
    db.GetDataUserById(req.params.id, function (user) { 
        res.json(user);
    });
});

app.post('/user', (req, res) => {
    db.AddUserToDatabase(req.body, (user) => { 

        res.json(user);
    });
});

app.put('/user/:id', (req, res) => {
     db.UpdateUserDataById(UserId, req.body, (user) => {
       res.json(user);
     });
});


app.delete('/user/:id', (req, res) => {
    res.send(db.DeleteUserById(req.params.id, function (user) {
        res.json(user);
     }));
});

/* routes messages */
app.get('/message', (req, res) => {
    db.GetAllMessage(function (message) { 
        res.json(message);
    })
});

app.get('/message/:id', (req, res) => {
    res.send(db.GetDataMessageById(req.params.id));
});

app.post('/message/:id', (req, res) => {
    
});

app.delete('/message/:id', (req, res) => {
    
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
db.GetAllUser(callback);
