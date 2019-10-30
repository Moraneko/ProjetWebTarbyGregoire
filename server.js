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

const app = express()
var user = []
var id = 0

// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))
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
  } else {
    res.json({ message: 'L\'adresse email renseignée est deja utilisée', connect: 'false' })
  }
})
app.post('/api/maListe', (req, res) => {
  for (var i in user) {
    if (req.body.id === user[i].idUser) {
      res.json(user[i].listePerso)
    }
  }
})
app.post('/api/addAnime', (req, res) => {
  console.log(user)
  for (var i in user) {
    if (req.body.id === user[i].idUser) {
      user[i].listePerso.push(req.body.newData)
      res.json(user[i].listePerso)
    }
  }
})
app.post('/api/delAnime', (req, res) => {
  var done = false
  for (var i in user) {
    if (req.body.id === user[i].idUser) {
      for (var j in user[i].listePerso) {
        if (req.body.animeID === user[i].listePerso[j].anime.mal_id) {
          user[i].listePerso.splice(j, 1)
          res.json(user[i].listePerso)
          done = true
        }
      }
      if (!done) {
        res.json(user[i].listePerso)
      }
    }
  }
})
app.post('/api/updateScore', (req, res) => {
  for (var i in user) {
    if (req.body.id === user[i].idUser) {
      for (var j in user[i].listePerso) {
        if (req.body.animeID === user[i].listePerso[j].anime.mal_id) {
          user[i].listePerso[j].score = req.body.newScore
          res.json({
            indexToUpdate: j,
            score: req.body.newScore
          })
        }
      }
    }
  }
})
app.post('/api/updateComment', (req, res) => {
  for (var i in user) {
    if (req.body.id === user[i].idUser) {
      for (var j in user[i].listePerso) {
        if (req.body.animeID === user[i].listePerso[j].anime.mal_id) {
          user[i].listePerso[j].commentaire = req.body.newComment
          res.json({
            indexToUpdate: j,
            comment: req.body.newComment
          })
        }
      }
    }
  }
})
app.post('/api/getComment', (req, res) => {
  var commentList = []
  for (var i in user) {
    for (var j in user[i].listePerso) {
      if (req.body.animeID === user[i].listePerso[j].anime.mal_id) {
        commentList.push({
          user: user[i].user,
          score: user[i].listePerso[j].score,
          commentaire: user[i].listePerso[j].commentaire
        })
      }
    }
  }
  res.json(commentList)
})

app.post('/api/login', (req, res) => {
  var input = req.body
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

app.post('/api/logout', (req, res) => {
  res.json({ message: 'Vous etes déconnecté',
    connect: 'false',
    session: { 'user': '', 'idUser': -1, 'connecte': 'false' } })
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
