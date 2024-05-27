// RUTAS REQUERIDAS:
// /login
// /profile
// /form
// /contacts
const correo = "admin@admin.com"
const contrasena = "admin"

const express = require("express")
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const users=[
    {"email": "rataratosa@gmail.com","username":"thefatrat","id":"111","password":"ratablanca"},
    {"email": "chiguirin@gmail.com","username":"capyguiro","id":"222","password":"elviajedechiguiro"},
    {"email": "joemama@gmail.com","username":"biden007","id":"333","password":"fucktrump"},
    {"email": "usuario1@gmail.com", "username": "user1", "id": "101", "password": "contraseña1"},
    {"email": "usuario2@gmail.com", "username": "user2", "id": "102", "password": "contraseña2"},
    {"email": "usuario3@gmail.com", "username": "user3", "id": "103", "password": "contraseña3"},
    {"email": "usuario4@gmail.com", "username": "user4", "id": "104", "password": "contraseña4"},
    {"email": "usuario5@gmail.com", "username": "user5", "id": "105", "password": "contraseña5"},
    {"email": "usuario6@gmail.com", "username": "user6", "id": "106", "password": "contraseña6"},
    {"email": "usuario7@gmail.com", "username": "user7", "id": "107", "password": "contraseña7"},
    {"email": "usuario8@gmail.com", "username": "user8", "id": "108", "password": "contraseña8"},
    {"email": "usuario9@gmail.com", "username": "user9", "id": "109", "password": "contraseña9"},
    {"email": "usuario10@gmail.com", "username": "user10", "id": "110", "password": "contraseña10"},
    {"email": "usuario11@gmail.com", "username": "user11", "id": "111", "password": "contraseña11"},
    {"email": "usuario12@gmail.com", "username": "user12", "id": "112", "password": "contraseña12"},
    {"email": "usuario13@gmail.com", "username": "user13", "id": "113", "password": "contraseña13"},
    {"email": "usuario14@gmail.com", "username": "user14", "id": "114", "password": "contraseña14"},
    {"email": "usuario15@gmail.com", "username": "user15", "id": "115", "password": "contraseña15"},
    {"email": "usuario16@gmail.com", "username": "user16", "id": "116", "password": "contraseña16"},
    {"email": "usuario17@gmail.com", "username": "user17", "id": "117", "password": "contraseña17"},
    {"email": "usuario18@gmail.com", "username": "user18", "id": "118", "password": "contraseña18"},
    {"email": "usuario19@gmail.com", "username": "user19", "id": "119", "password": "contraseña19"},
    {"email": "usuario20@gmail.com", "username": "user20", "id": "120", "password": "contraseña20"}
]

app.get('/', (req, res) => {
    console.log("accedio sin problemas a /")
    res.status(200).send("Ha accedido a localhost:3000, vaya a login para obtener su token")
    //res.send("Ha accedido a localhost:8080")
  });

/*const testUser = {
        id: 1,
        nombre: "henry",
        email: "henry@gmail.com"
    }

    jwt.sign({user: testUser}, 'secretkey', (err, token) => {
        res.json({
            token: token
        })
    })*/

app.get("/login", (req, res) => {
    res.send(`<html>
        <head>
            <title>loginForm</title>
        </head>
        <body>
            <form method="POST" action="/login">
                Usuario: <input type="text" name="text"/><br />
                Contraseña: <input type="password" name="password" /><br />
                <input type="submit" value="Iniciar sesion" />
            </form>
        </body>
        </html>`
        )
})

app.post("/login", (req, res) => {
    const usuarioIngresado = req.body.text;
    const contrasenaIngresada = req.body.password;

    if (usuarioIngresado === correo && contrasenaIngresada === contrasena) {
        const payload = {
            user: usuarioIngresado,
            password: contrasenaIngresada
        }
        const accessToken = jwt.sign({user: payload}, 'secretkey', (err, token) => {
            res.json({
                token: token
            })
        })
    } else {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" })
    }
})

// profile endpoint
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

// form endpoint
app.post("/form", tokenValidation, (req, res, text) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403)
        }else{
            res.json({text: "text"})
        }
    })
})

// contacts endpoint
app.get("/contacts", tokenValidation, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {            
            const usuariosAleatorios = obtenerUsuariosAleatorios(users, 5);

            res.json({
                usuarios: usuariosAleatorios,
            });
        }
    });
});

function obtenerUsuariosAleatorios(array, cantidad) {
    const usuariosAleatorios = [];
    const indicesAleatorios = new Set();

    while (indicesAleatorios.size < cantidad) {
        const indice = Math.floor(Math.random() * array.length);
        indicesAleatorios.add(indice);
    }

    indicesAleatorios.forEach((indice) => {
        usuariosAleatorios.push(array[indice]);
    });

    return usuariosAleatorios;
}

app.listen(3000, function() {
    console.log("nodejs app running")
})

