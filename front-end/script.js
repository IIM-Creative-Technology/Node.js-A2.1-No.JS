const socket = io("http://localhost:3000");

////-------------------- Formulaire de login---------------------------------////
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

const formLogin = document.getElementById("form1")
formLogin.addEventListener('click', () =>{
    fetch("http://localhost:3000/user/connexion",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                loginUsername: loginUsername.value,
                loginPassword: loginPassword.value,
            })
        })
        .then(data => data.json())
        .then(data => {console.log(data)})
})

////-------------------- Formulaire d'inscription---------------------------------////
const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');

const formRegister = document.getElementById("form2")
formRegister.addEventListener('click', () =>{
    fetch("http://localhost:3000/user",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                registerUsername: registerUsername.value,
                registerPassword: registerPassword.value,
            })
        })
        .then(data => data.json())
        .then(data => {console.log(data)})
})
