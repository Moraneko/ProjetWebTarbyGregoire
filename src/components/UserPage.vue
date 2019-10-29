<template>
 <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="200" class="primary">
    <v-list>
      <v-list-item @click="retour()" :to="{name: 'Accueil'}" color="black">
          <div class="d-flex flex-row align-center">
            <v-icon color="white">home</v-icon> <h3 class="d-flex px-5" style="color: white;">Acceuil</h3>
            </div>

        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Site Tarby-Grégoire</v-toolbar-title>
       <div class="flex-grow-1"></div>
        <v-toolbar-items v-if="!connected" >
           <v-btn color="#f00000">Inscription</v-btn>
           <v-btn color="#f00000">Connexion</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else >
           <v-btn color="#f00000" class="pr-12"><v-icon class="px-1 mr-3">mdi-account</v-icon>{{userName}}</v-btn>
           <v-btn color="#f00000"><v-icon class="px-1 ">mdi-close</v-icon>Deonnexion</v-btn>
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
          <userAnimeInfo v-on:updateScore="updateScore" :titre="item.anime.title" :added="isInListPerso(item.anime.mal_id)" :index="index" :img="item.anime.image_url" :score="item.score" :connected="connected" :id="item.anime.mal_id"></userAnimeInfo>
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
import { bus } from '../main'

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
    userName: 'Moran',
    drawer: null,
    connected: true,
    appelBool: false,
    listePerso: []
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
      for (var i in this.listePerso) {
        if (infoToUpdate[1] === this.listePerso[i].anime.mal_id) {
          this.listePerso[i].score = infoToUpdate[0]
        }
      }
      this.meanScore()
    },
    delThisAnime: function (idOfAnime) {
      for (var i in this.listePerso) {
        if (this.listePerso[i].anime.mal_id === idOfAnime) {
          console.log('hello')
          this.listePerso.splice(i, 1)
        }
      }
    },
    isInListPerso: function (idFromAnime) {
      for (var i in this.listePerso) {
        if (idFromAnime === this.listePerso[i].anime.mal_id) {
          return [true, this.listePerso[i].score]
        }
      }
      return [false, 0]
    },
    updateComment: function (newComment) {
      for (var i in this.listePerso) {
        if (newComment[1] === this.listePerso[i].anime.mal_id) {
          this.listePerso[i].commentaire = newComment[0]
          console.log(this.listePerso)
        }
      }
    },
    retour () {
    }
  },

  created () {
    this.$vuetify.theme.dark = true
    this.meanScore()
    this.stat()
    bus.$on('delThisAnime2', (idToDel) => {
      this.delThisAnime(idToDel)
    })
    bus.$on('updateScoreFromOverLay', (val) => {
      this.updateScore([val[0], val[1]])
    })
    bus.$on('updateComment', (val) => {
      this.updateComment([val[0], val[1]])
    })
  }
}
</script>
