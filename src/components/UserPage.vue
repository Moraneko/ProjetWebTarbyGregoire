<template>
 <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="200" class="primary">
    <v-list>
      <v-list-item v-on:click="updateScore">
          <div class="d-flex flex-row align-center">
            <v-icon>home</v-icon> <h3 class="d-flex px-5">Acceuil</h3>
            </div>

        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
       <div class="flex-grow-1"></div>
        <v-toolbar-items >
           <v-btn color="#f00000">Inscription</v-btn>
           <v-btn color="#f00000">Connection</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content class="primary">
      <v-card tile class="primary d-flex justify-center">
        <div><h1 class="d-flex justify-center">Nom utilisateur</h1><h2 class="pb-5">Liste de vos animes et statistiques.</h2></div>
      </v-card>
      <div class="d-flex flex-column mx-9 px-9">
        <v-card class="secondary mx-9 px-9">
          <div><h1 class="d-flex justify-center ">Statistiques</h1></div>
          <div class="d-flex justify-space-around"><h2>TV: {{nbTV}}</h2><h2> OVA: {{nbOAV}}</h2><h2>Film: {{nbFilm}}</h2><h2>Episodes: {{nbEp}}</h2><h2>Score moyen: {{mean}} </h2></div>
        </v-card>
        <div class="py-2"></div>
        <v-card class="secondary d-flex flex-column mx-9 my-4" v-for="(item,index) in listePerso" :key="index">
          <userAnimeInfo v-on:updateScore="updateScore" :titre="item.anime.title" :index="index" :img="item.anime.image_url" :score="item.score" :id="item.anime.mal_id"></userAnimeInfo>
        </v-card>
      </div>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import userAnimeInfo from './userAnimeInfo'

export default {
  components: {
    userAnimeInfo
  },
  props: {
    source: String
  },
  data: () => ({
    nbTV: 0,
    nbFilm: 0,
    nbOAV: 0,
    nbEp: 0,
    mean: 0,
    drawer: null,
    connected: true,
    appelBool: false,
    listePerso: [
      {
        anime: {
          'mal_id': 5114,
          'rank': 1,
          'title': 'Fullmetal Alchemist: Brotherhood',
          'url': 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
          'image_url': 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
          'type': 'TV',
          'episodes': 64,
          'start_date': 'Apr 2009',
          'end_date': 'Jul 2010',
          'members': 1562628,
          'score': 9.23
        },
        score: 5
      },
      {
        anime: {
          'mal_id': 9253,
          'rank': 2,
          'title': 'Steins;Gate',
          'url': 'https://myanimelist.net/anime/9253/Steins_Gate',
          'image_url': 'https://cdn.myanimelist.net/images/anime/5/73199.jpg?s=97b97d568f25a02cf5a22dda13b5371f',
          'type': 'TV',
          'episodes': 24,
          'start_date': 'Apr 2011',
          'end_date': 'Sep 2011',
          'members': 1291950,
          'score': 9.12
        },
        score: 4
      },
      { anime: {
        'mal_id': 9253,
        'rank': 2,
        'title': 'Steins;Gate',
        'url': 'https://myanimelist.net/anime/9253/Steins_Gate',
        'image_url': 'https://cdn.myanimelist.net/images/anime/5/73199.jpg?s=97b97d568f25a02cf5a22dda13b5371f',
        'type': 'TV',
        'episodes': 24,
        'start_date': 'Apr 2011',
        'end_date': 'Sep 2011',
        'members': 1291950,
        'score': 9.12
      },
      score: 3
      }
    ]
  }),
  methods: {
    meanScore: function () {
      var k = 0
      var nbInListe = 0
      for (var i in this.listePerso) {
        k += this.listePerso[i].score
        nbInListe++
      }
      this.mean = Math.trunc(k / nbInListe)
    },
    stat: function () {
      var tv = 0
      var oav = 0
      var film = 0
      var episode = 0
      for (var i in this.listePerso) {
        episode += this.listePerso[i].anime.episodes
        if (this.listePerso[i].anime.type === 'TV') {
          tv++
        } else if (this.listePerso[i].anime.type === 'Movie') {
          film++
        } else {
          oav++
        }
      }
      this.nbTV = tv
      this.nbOAV = oav
      this.nbEp = episode
      this.nbFilm = film
    },
    updateScore: function (infoToUpdate) {
      this.listePerso[infoToUpdate[1]].score = infoToUpdate[0]
      this.meanScore()
    },
    initTable: function (data) {
      this.dataFromApi = data.top
    }
  },
  created () {
    this.$vuetify.theme.dark = true
    this.meanScore()
    this.stat()
    fetch('https://api.jikan.moe/v3/top/anime/1').then(response => {
      return response.json()
    }).then(data => {
      this.initTable(data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
