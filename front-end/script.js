//const socket = io("http://localhost:3000");

////-------------------- Formulaire de login---------------------------------////
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

const buttonLogin = document.getElementById("form1")
buttonLogin.addEventListener('click', () =>{
    fetch("http://localhost:3000/login",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "username": loginUsername.value,
                "password": loginPassword.value,
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
        if(data.token !== undefined){
            console.log("User logged")
            localStorage.setItem("token", data.token)
            //redirection to main.html
            window.location.href = "main.html"
        }
        })
})

////-------------------- Formulaire d'inscription---------------------------------////
const registerFirstName = document.getElementById('registerFirstName');
const registerLastName = document.getElementById('registerLastName');
const registerPseudo = document.getElementById('registerPseudo');
const registerPassword = document.getElementById('registerPassword');

const buttonRegister = document.getElementById("form2")
buttonRegister.addEventListener('click', () =>{
    fetch("http://localhost:3000/user",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                FisrtName: registerFirstName.value,
                LastName: registerLastName.value,
                Pseudo: registerPseudo.value,
                Password: registerPassword.value,
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            if(data._id !== undefined){
                console.log("User created")
                alert("User created, you can now login")
            }
        })
})
