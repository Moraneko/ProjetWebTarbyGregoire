<template>
 <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="200" class="primary">
    <v-list>
        <v-list-item>
          <div>
            <v-list-item-icon> <v-icon>fas fa-search</v-icon> </v-list-item-icon>
            <v-text-field hide-details class="pb-5"  outlined color="#f00000" v-model="searchSTR" prepend-icon="search" single-line @keyup.enter="search()"></v-text-field></div>
        </v-list-item>
        <v-list-group no-action sub-group color="white" >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Genres</v-list-item-title>
            </v-list-item-content>
          </template>
          <div>
          <v-list-item
            v-for="(item,index) in genre"
            :key="index"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="item[0]" @click="changeGenre(item[1])" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </div>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Site Tarby-Grégoire</v-toolbar-title>
       <div class="flex-grow-1"></div>
        <v-toolbar-items v-if="!connected">
           <v-btn :to="{name: 'Inscription'}" color="#f00000">Inscription</v-btn>
           <v-btn @click="ouvrirOverlayConnection" color="#f00000">Connexion</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else >
           <v-btn color="#f00000" :to="{name: 'Utilisateur'}" class="pr-12"><v-icon class="px-1 mr-3">mdi-account</v-icon>{{userName}}</v-btn>
           <v-btn color="#f00000"><v-icon class="px-1 ">mdi-close</v-icon>Deconnexion</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content class="primary">
      <v-card tile class="primary d-flex justify-center">
        <div><h1 class="d-flex justify-center">Bienvenue sur notre site!</h1><h2>Ici vous pourrez réaliser une liste des animes que vous avez vus afin de donner votre avis et le partager </h2>
        <h1 v-if="appelBool === true" class="d-flex justify-center">Chargement</h1></div>
      </v-card>
      <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; padding: 10px;">
        <ConnectOverlay :overlayVisibility="overlayVisibility" @fermerOverlay="fermerOverlayConnection" />
        <v-card
          v-for="(item,index) in dataFromApi"
          :key="item.id"
          class="d-flex justify-space-around mb-6 primary"
          tile
          height="500"
          >
          <CarteInfo :index="index" v-if="item.rated === undefined " :titre="item.title" :img="item.image_url" :connected="connected" :score="item.score" :id="item.mal_id" :added="isInListPerso(item.mal_id)" @updateScore="updateScore" @delThisAnime="delThisAnime" @addThisAnime="addThisAnime"></CarteInfo>
          <CarteInfo :index="index" v-else-if="item.rated !== 'Rx' " :titre="item.title" :img="item.image_url" :connected="connected" :score="item.score" :id="item.mal_id" :added="isInListPerso(item.mal_id)" @updateScore="updateScore" @delThisAnime="delThisAnime" @addThisAnime="addThisAnime"></CarteInfo>
        </v-card>
      </div>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import CarteInfo from './CarteInfo'
import ConnectOverlay from './ConnectOverlay'
import { bus } from '../main'
import Vue from 'vue'

export default {
  props: {
    source: String
  },
  data: () => ({
    overlayVisibility: false,
    userName: '',
    drawer: null,
    linkApi: 'https://api.jikan.moe/v3/',
    idUser: 1,
    dataFromApi: '',
    searchSTR: '',
    connected: true,
    appelBool: false,
    listePerso: [],
    genre: [
      ['Action', 1], ['Aventure', 2], ['Comédie', 4],
      ['Mysère', 7], ['Drama', 8], ['Fantaisie', 10],
      ['Jeux', 11], ['Historique', 13], ['Horreur', 14],
      ['Magie', 16], ['Arts Martiaux', 17], ['Mecha', 18],
      ['Musique', 19], ['Parodie', 20], ['Samourai', 21], ['Romance', 22],
      ['Ecole', 23], ['Sci-fi', 24], ['Shonen', 27], ['Shoujo', 25], ['Espace', 29], ['Sport', 30],
      ['Super pouvoir', 31], ['Vampire', 32], ['Slice of Life', 36], ['Militaire', 38], ['Police', 39],
      ['Psychologique', 40], ['Trhiller', 41]
    ]
  }),
  components: {
    CarteInfo,
    ConnectOverlay
  },
  methods: {
    initTable: function (data) {
      this.dataFromApi = data.top
    },
    fermerOverlayConnection: function () {
      this.overlayVisibility = false
    },
    ouvrirOverlayConnection: function () {
      this.overlayVisibility = true
    },
    updateScore: function (infoToUpdate) {
      Vue.axios.post('http://localhost:4000/api/updateScore', {
        id: this.idUser,
        animeID: infoToUpdate[1],
        newScore: infoToUpdate[0]
      }).then(response => {
        console.log(response.data)
        this.listePerso[response.data.indexToUpdate].score = response.data.score
        bus.$emit('updateOverlayInfo')
      }).catch(function (error) {
        console.log(error)
      })
    },
    isInListPerso: function (idFromAnime) {
      for (var i in this.listePerso) {
        if (idFromAnime === this.listePerso[i].anime.mal_id) {
          return [true, this.listePerso[i].score]
        }
      }
      return [false, 0]
    },
    changeGenre: function (idGenre) {
      this.appelBool = true
      fetch(this.linkApi + 'genre/anime/' + idGenre + '/1').then(response => {
        return response.json()
      }).then(data => {
        this.dataFromApi = data.anime
        this.appelBool = false
      }).catch(err => {
        console.log(err)
      })
    },
    updateComment: function (newComment) {
      var self = this
      Vue.axios.post('http://localhost:4000/api/updateComment', {
        id: self.idUser,
        animeID: newComment[1],
        newComment: newComment[0]
      }).then(response => {
        self.listePerso[response.data.indexToUpdate].commentaire = response.data.comment
        bus.$emit('updateOverlayInfo')
      }).catch(function (error) {
        console.log(error)
      })
    },
    delThisAnime: function (idOfAnime) {
      Vue.axios.post('http://localhost:4000/api/delAnime', {
        id: this.idUser,
        animeID: idOfAnime
      }).then(response => {
        this.listePerso = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    getMyNewList: function () {
      Vue.axios.post('http://localhost:4000/api/maListe', {
        id: this.idUser
      }).then(response => {
        this.listePerso = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    addThisAnime: function (indexOfAnime) {
      var obj = JSON.parse('{"anime": ' + JSON.stringify(this.dataFromApi[indexOfAnime]) + ',"score":0,"commentaire":""}')
      Vue.axios.post('http://localhost:4000/api/addAnime', {
        id: this.idUser,
        newData: obj
      }).then(response => {
        this.listePerso = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    search: function () {
      this.allBool = true
      fetch(this.linkApi + 'search/anime?q=' + this.searchSTR.replace(' ', '%20') + '&page=1?rated=g,pg,pg13,r17').then(response => {
        return response.json()
      }).then(data => {
        this.dataFromApi = data.results
        this.appelBool = false
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.$vuetify.theme.dark = true
    bus.$on('fermerOverlayConnexion', () => {
      this.overlayVisibility = false
    })
    bus.$on('updateScoreFromOverLay', (infoFromOverlay) => {
      this.updateScore(infoFromOverlay)
    })
    bus.$on('delThisAnime2', (idToDel) => {
      this.delThisAnime(idToDel)
    })
    bus.$on('addThisAnime2', (indexToAdd) => {
      this.addThisAnime(indexToAdd)
    })
    bus.$on('updateComment', (val) => {
      this.updateComment([val[0], val[1]])
    })
    fetch('https://api.jikan.moe/v3/top/anime/1').then(response => {
      return response.json()
    }).then(data => {
      this.initTable(data)
    }).catch(err => {
      console.log(err)
    })
    this.getMyNewList()
  }
}
</script>
