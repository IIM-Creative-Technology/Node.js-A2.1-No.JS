const socket = io("http://localhost:3000");

////-------------------- Formulaire de login---------------------------------////

const formLogin = document.getElementById("form1")
formLogin.addEventListener(click, () =>{
    fetch("http://localhost:3000/user/connexion",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                loginFirstname: req.user,
                loginLastname: req.user,
                loginPassword: req.user,
})
        }).then(data => data.json())
        .then(data => (data) => {
            console.log(data)

            }
        )
})

////-------------------- Formulaire de d'inscription---------------------------------////


const formRegister = document.getElementById("form2")
formLogin.addEventListener(click, () =>{
    fetch("http://localhost:3000/user",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                registerFirstname: req.user,
                registerlastname: req.user,
                registerPassword: req.user,
            })
        }).then(data => data.json())
        .then(data => function (data){
                console.log(data)

            }
        )
})
