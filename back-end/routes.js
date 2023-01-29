import express from 'express';

const app = express();
app.use(express.json());

app.post('/users/register', (req, res) => {
    this.user= {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
    };
    res.status(200).send(this.user);
})

export default app;