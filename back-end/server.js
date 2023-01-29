import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./routes.js";
const user = {
    "username": "",
    "password": "",
    "email": "",
};
app.use(express.json());
app.use(cors);
app.use(createServer());
app.use(Server());
// Déclaration des routes



app.post('/users/register', (req, res) => {
   this.user= {
       "username": req.body.username,
       "password": req.body.password,
       "email": req.body.email,
   };
   res.status(200).send(this.user);
})



app.post('/users/deconnexion/:userid', (req, res) => {



// récupération des paramètres dans la requête req



// La réponse est transmise dans l’objet réponse res



})



app.get('/users', (req, res) => {



// mettre le code ici​

})

app.get('/users/:userid', (req, res) => {



// mettre le code ici

})



app.post('/users/update', (req, res) => {



// récupération des paramètres dans la requête req



// La réponse est transmise dans l’objet réponse res



})