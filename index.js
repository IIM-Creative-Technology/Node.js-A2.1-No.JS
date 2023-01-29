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

/* routes users */
/*-------------------------------------------------------------------*/
/* Cette route permet de récupérer la liste des utilisateurs du site */
/* Parametres : N/A                                                  */
/*-------------------------------------------------------------------*/
app.get('/user', (req, res) => {
    const users = [
        {_id:1, firstname:"firstname user 1", lastname:"lastname user 1", email:"email user 1"},
        {_id:2, firstname:"firstname user 2", lastname:"lastname user 2", email:"email user 2"},
        {_id:3, firstname:"firstname user 3", lastname:"lastname user 3", email:"email user 3"},
    ];
    res.json(users);
});

/*-------------------------------------------------------------------*/
/* Cette route permet de récupérer un utilisateur à partir de son id */
/* Parametres : id (id de l'utilisateur)                             */
/*-------------------------------------------------------------------*/
app.get('/user/:id', (req, res) => {
    const user = {
        _id:req.params.id,
        firstname:"firstname user 1",
        lastname:"lastname user 1",
        email:"email user 1"
    }
    res.json(user);
});

/*-------------------------------------------------------------------*/
/* Cette route permet à un user de se connecter                      */
/* Parametres : email et password                                    */
/*-------------------------------------------------------------------*/
app.post('/user/connexion', (req, res) => {
    const user = {
        email:req.body.email,
        password:req.body.password
    }
    res.json(user);
});

/*-------------------------------------------------------------------*/
/* Cette route permet à un user de se déconnecter                    */
/* Parametres :id du user                                            */
/*-------------------------------------------------------------------*/
app.post('/user/:id/deconnexion', (req, res) => {
    const user = {
        userid:req.params.id
    }
    res.json(user);
});

/*-------------------------------------------------------------------*/
/* Cette route permet de mettre à jour un user                       */
/* Parametres : email et password                                    */
/*-------------------------------------------------------------------*/
app.put('/user/:id', (req, res) => {
    const user = {
        _id:req.params.id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    }
    res.json(user);
});

/*----------------------------------------------------*/
/* Cette route permet de créer un user                */
/* Parametres : lastname, firstname, email, password  */
/*----------------------------------------------------*/
app.post('/user', (req, res) => {
    const user = {
        _id:1,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    }
    res.json(user);
});

/*-------------------------------------------------------------*/
/* Cette route permet de supprimer un user à partir de son id  */
/* Parametres : id du user                                     */
/*-------------------------------------------------------------*/
app.delete('/user/:id', (req, res) => {
    const user = {
        _id: req.params.id,
    }
    res.json(user);
});

/* routes messages */
/*-------------------------------------------------------------*/
/* Cette route permet de récupérer la liste des messages       */
/* Parametres : N/A                                            */
/*-------------------------------------------------------------*/
app.get('/message', (req, res) => {
    const messages = [
        {_id:1, message:"message 1", userid:10, uri:"/user/" + 10},
        {_id:2, message:"message 2", userid:11, uri:"/user/" + 11},
    ];
    res.json(messages);
});

/*---------------------------------------------------------------*/
/* Cette route permet de récupérer un message à partir de son id */
/* Parametres : id du message                                    */
/*---------------------------------------------------------------*/
app.get('/message/:id', (req, res) => {
    const message = {
        _id:req.params.id,
        message:"message 2",
        userid:11,
        uri:"/user/" + 11
    };
    res.json(message);
});

/*------------------------------------------------------------------------*/
/* Cette route permet de mettre à jour un message                         */
/* Parametres : id du message, id de l'utilisteur ayant saisi le message  */
/*------------------------------------------------------------------------*/
app.put('/message/:messageid/user/:userid', (req, res) => {
    const message = {
        _id:req.params.messageid,
        message:req.body.message,
        userid:req.params.userid,
        uri:"/user/" + req.params.userid
    };
    res.json(message);
});

/*------------------------------------------------------------------------*/
/* Cette route permet de créer un message                                 */
/* Parametres : id de l'utilisateur                                       */
/*------------------------------------------------------------------------*/
app.post('/message/user/:id', (req, res) => {
    const message = {
        _id:43,
        message:req.body.message,
        userid:req.params.id,
        uri:"/user/" + req.params.id
    };
    res.json(message);
});

/*------------------------------------------------------------------------*/
/* Cette route permet de supprimer un message                             */
/* Parametres : id du message                                             */
/*------------------------------------------------------------------------*/
app.delete('/message/:id', (req, res) => {
    const message = {
        _id:req.params.id
    };
    res.json(message);
});

/* routes pixels */
/*------------------------------------------------------------------------*/
/* Un pixel se défini par des coordonnées x, y                            */
/* et l'identifiant du user qui a affecté une couleur à ce pixel          */
/* et le code couleur affecté à ce piexel                                 */
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/
/* Cette route permet de récupérer la liste de piexel enregistrés         */
/* Parametres : N/A                                                       */
/*------------------------------------------------------------------------*/
app.get('/pixel', (req, res) => {
    const pixels = [
        {_id:1, x:0, y:0, color:"#FFFF", userid:10, uri:"/user/" + 10},
        {_id:2, x:1, y:0, color:"red", userid:11, uri:"/user/" + 11},
    ];
    res.json(pixels);
});


/*------------------------------------------------------------------------*/
/* Cette route permet de mettre à jour un pixel                           */
/* Parametres : id du pixel et l'id du user                               */
/* http://localhost:3000/pixel/10/color/red/user/23                       */
/*------------------------------------------------------------------------*/
app.put('/pixel/:pixelid/color/:codecolor/user/:userid', (req, res) => {
    const pixel = {
        _id:req.params.pixelid,
        color:req.params.codecolor,
        userid:req.params.userid,
        uri:"/user/" + req.params.userid
    };
    res.json(pixel);
});

/*------------------------------------------------------------------------*/
/* Cette route permet de créer un pixel                                   */
/* Parametres : id du pixel et l'id du user et le code couleur du pixel   */
/*------------------------------------------------------------------------*/
app.post('/pixel/color/:codecolor/user/:id', (req, res) => {
    const pixel = {
        _id:req.params.pixelid,
        color:req.params.codecolor,
        userid:req.params.id,
        uri:"/user/" + req.params.id
    };
    res.json(pixel);
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