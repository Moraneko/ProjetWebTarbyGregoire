/**
 *
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 * puis node server.js
 * exemple complet à l'adresse https://github.com/Musinux/first-vue-app
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
var cookieParser = require('cookie-parser')

const app = express()
var user = []
var id = 0

// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))
app.use(cookieParser())
app.use(session({
  secret: 'Moran', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
const path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))

const users = [{
  username: 'admin',
  password: 'changethispassword'
}]

app.get('/api/test', (req, res) => {
  console.log('ce console.log est appelé au bon moment')
  res.json([
    {
      title: 'truc',
      content: 'machin'
    }, {
      title: 'truc2',
      content: 'machin2'
    }
  ])
})
/*
app.post('/api/login', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  if (!req.session.userId) {
    const user = users.find(u => u.username === req.body.login && u.password === req.body.password)
    if (!user) {
      // gérez le cas où on n'a pas trouvé d'utilisateur correspondant
      res.status(401)
      res.json({
        message: 'error'
      })
    } else {
      // connect the user
      req.session.userId = 1000 // connect the user, and change the id
      res.json({
        message: 'connected'
      })
    }
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
  }
}) */

app.post('/api/sigin', (req, res) => {
  console.log('ok')
  var input = req.body
  var info = { user: input.Prenom,
    email: input.email,
    password: input.password,
    idUser: 0,
    listePerso: [] }
  const element = user.find(info => info.email === input.email)
  if (element === undefined) {
    id = id + 1
    info.idUser = id
    user.push(info)
    res.json({ message: 'inscription réussie', connect: 'true' })
    console.log(user)
  } else {
    console.log('deja present')
    res.json({ message: 'L\'adresse email renseignée est deja utilisée', connect: 'false' })
  }
})

app.post('/api/login', (req, res) => {
  console.log('ok')
  var input = req.body
  var info = { email: input.email,
    password: input.password }
  const element = user.find(info => info.email === input.email)
  if (element === undefined) {
    res.json({ message: 'Il n\'existe aucun compte associé à cette E-mail', connect: 'false', session: 'false' })
  } else if (element.password === input.password) {
    req.session.userSession = { 'user': element.user, 'idUser': element.idUser, 'connecte': 'true' }
    res.json({ message: 'Vous etes connecté', connect: 'true', session: req.session.userSession })
  } else {
    res.json({ message: 'Mot de passe incorect', connect: 'false', session: 'user:' })
  }
})

app.get('/api/logout', (req, res) => {
  if (!req.session.userId) {
    res.status(401)
    res.json({
      message: 'you are already disconnected'
    })
  } else {
    req.session.userId = 0
    res.json({
      message: 'you are now disconnected'
    })
  }
})

app.get('/api/admin', (req, res) => {
  if (!req.session.userId || req.session.isAdmin === false) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  res.json({
    message: 'congrats, you are connected'
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
