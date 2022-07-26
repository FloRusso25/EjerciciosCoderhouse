//import express y definiciones
import express from'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import LocalStrategy from ('passport-local').Strategy
import passport from 'passport'
import handlebars from 'express-handlebars'
import UsuarioMongoDB from "./clases/UsuarioMDB.js"
import { config } from 'webpack'

const PORT = 8080
const usuarioMDB = new UsuarioMongoDB()
const app = express()
const TIEMPO_EXPIRACION = 1000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('Public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

//instancia de servidor y uso de funciones con express
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))


usuarioMDB.connectMongoose()

passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        try {
            const usr = await usuarioMDB.validateUser(username, password)
            console.log('User logged')

            return done(null, username)
        }
        catch(error) {
            console.log(`ERROR: ${error}`)
            return done(error) 
       }
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true },
    (req, username, password, done) => {
        try {
            const usrId = await usuarioMDB.save({username: username, password: password})
            return done(null, usrId)
        }
        catch(error) {
            console.log(`ERROR: ${error}`)
            return done(error)
        }
        
    }
))

app.use(session({
    secret: 'secretSecret',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: config.TIEMPO_EXPIRACION
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

// app.get('/', (req, res) => {
//     res.render('main', {layout: 'index'} )
// })

// app.get('/login', (req, res) => {
//     res.render('login', {layout: 'index'} )
// })

// app.post('/login', async (req, res) => {
//     res.render('login', {layout: 'index'} )
//     console.log(`POST login usuario ${JSON.stringify(req.body)}`)
//     const user = await usuarioMDB.validateUser(req.body.username, req.body.password)
//     console.log(`ID: ${user}`)
//     if (user == false ){
//         console.log('User not registered')
//         return res.redirect('/faillogin')
//     }
//     console.log(`User ${user.username} logged`)
// })

// app.get('/register', (req, res) => {
//     res.render('register', {layout: 'index'} )
// })

// app.post('/register', async (req, res) => {
//     res.render('register', {layout: 'index'} )
//     console.log(`POST registro usuario ${JSON.stringify(req.body)}`)
//     const id = await usuarioMDB.save(req.body)
//     console.log(`ID: ${id}`)
//     if (id == null ){
//         console.log('Register failed')
//         return res.redirect('/failregister')
//     } 
// })

// app.get('/failregister', async (req, res) => {
//     res.render('failregister', {layout: 'index'} )
// })

// app.get('/faillogin', async (req, res) => {
//     res.render('faillogin', {layout: 'index'} )
// })





