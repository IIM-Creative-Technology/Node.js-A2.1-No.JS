// IMPORTS -------------------------------------------------------------------------------------------------------------
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
// APP -----------------------------------------------------------------------------------------------------------------
const app = express();
const httpServer = http.createServer(app);
const ioServer = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// CONNECTION TO DATABASE _____________________________________________________________________________________________________________________________________________

// var username = encodeURIComponent(process.env.MONGO_DB_ATLAS_LOGIN_USERNAME);
// var password = encodeURIComponent(process.env.MONGO_DB_ATLAS_LOGIN_PASSWORD);
var link =
  "mongodb+srv://ImDImeh:projetnodejs2023@pixelchat.hfbyom1.mongodb.net/?retryWrites=true&w=majority";
  
mongoose.connect(
  link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."));


// ADD COLLECTION TO DATABASE _____________________________________________________________________________________________________________________________________________

const USER = new Schema({
  FisrtName: String,
  LastName: String,
  Password: String,
  Pseudo: String,
});
const User = mongoose.model("User", USER);

const message = new Schema({
  message: String,
  author_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
  body: String,
  DateTime: Number,
});


const Message = mongoose.model("Message", message);

const UserTest = new User({
  FisrtName: "Test",
  LastName: "Test",
  Password: "Test",
  Pseudo: "Test",
});
UserTest.save();


MessageTest = new Message({
  message: "Voici un message de test",
  author_id: UserTest._id,
  body: "Voici un message de test un peu l=plus long pour voir si ca marche",
  DateTime: Date.now(),

  
});
MessageTest.save();
// MIDDLEWARE ----------------------------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ROUTES --------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Hello World!");
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
  console.log(link);

});
