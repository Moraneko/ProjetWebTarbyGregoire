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
var user = [{ user: 'MORAN',
  email: 'moranmail.fr',
  password: 'Motdepasse',
  idUser: 1,
  listePerso: [{
    score: 5,
    commentaire: 'Nice',
    anime: {
      mal_id: 5114,
      rank: 1,
      title: 'Fullmetal Alchemist: Brotherhood',
      url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
      image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
      type: 'TV',
      episodes: 64,
      start_date: 'Apr 2009',
      end_date: 'Jul 2010',
      members: 1562628,
      score: 9.23
    }
  },
  {
    score: 3,
    commentaire: 'Ok',
    anime: {
      mal_id: 9253,
      rank: 2,
      title: 'Steins;Gate',
      url: 'https://myanimelist.net/anime/9253/Steins_Gate',
      image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg?s=97b97d568f25a02cf5a22dda13b5371f',
      type: 'TV',
      episodes: 24,
      start_date: 'Apr 2011',
      end_date: 'Sep 2011',
      members: 1291950,
      score: 9.12
    }
  }]
}]
var id = 0

app.set('view engine', 'vue')
// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))
app.use(session({
  secret: 'blablabla', // changez cette valeur
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
    res.json({ message: 'Inscription réussi', connect: 'true' })
    console.log(user)
  } else {
    console.log('deja present')
    res.json({ message: 'L\'adresse email renseigné est deja utilisé', connect: 'false' })
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
