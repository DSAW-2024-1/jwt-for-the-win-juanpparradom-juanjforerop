// /login
// /profile
// /form
// /contacts
const correo = "admin@admin.com"
const contrasena = "admin"

const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()

/*const loginForm = `<html>
<head>
    <title>loginForm</title>
</head>
<body>
    <form method="POST" action="/auth">
        Usuario: <input type="text" name="text" /><br />
        Contraseña: <input type="password" name="password" /><br />
        <input type="submit" value="Iniciar sesion" />
    </form>
</body>
</html>`*/

app.get("/login", (req, res) => {
    const testUser = {
        id: 1,
        nombre: "henry",
        email: "henry@gmail.com"
    }

    jwt.sign({user: testUser}, 'secretkey', (err, token) => {
        res.json({
            token: token
        })
    })
})

app.post("/profile", tokenValidation, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403)
        }else{
            const user = {
                "nombre": "John",
                "apellido": "Doe",
                "correo electronico": "jdoe@gmail.com",
                "fecha de nacimiento": "01/01/2001"
            }
            res.json(user)
        }
    })
})

function tokenValidation(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

app.post("/form", tokenValidation, (req, res, text) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403)
        }else{
            res.json({text: "text"})
        }
    })
})

app.get("/contacts", tokenValidation, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403)
        }else{
            res.json({
                usuarios: "xyz"
            })   
        }
    })
})

app.listen(3000, function() {
    console.log("nodejs app running")
})

/*res.send(`<html>
    <head>
        <title>form endpoint</title>
    </head>
    <body>
        <form method="POST" action="/form">
            text: <input type="text" name="text" />
            <input type="submit" value="Iniciar sesion" />
        </form>
    </body>
    </html>
    `
    )*/