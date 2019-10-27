<template>
 <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="200" class="primary">
    <v-list>
        <v-list-item>
          <div>
            <v-list-item-icon> <v-icon>fas fa-search</v-icon> </v-list-item-icon>
            <v-text-field hide-details  v-model="searchSTR" prepend-icon="search" single-line @keyup.enter="search()"></v-text-field></div>
        </v-list-item>
        <v-list-group no-action sub-group color="f00000" >
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
            <v-list-item-title v-text="item[0]" @click="changeGenre(item[1])" ></v-list-item-title>
          </v-list-item></div>
      </v-list-group>
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
        <div><h1 class="d-flex justify-center">Bienvenue sur notre site!</h1><h2>Ici vous pourrez réaliser une liste des animes que vous avez vue afin de donner votre avis et le partager </h2>
        <h1 v-if="appelBool === true" class="d-flex justify-center">Chargement</h1></div>
      </v-card>
      <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; padding: 10px;">
        <v-card
          v-for="item in dataFromApi"
          :key="item.id"
          class="d-flex justify-space-around mb-6 primary"
          tile
          height="500"
          >
          <CarteInfo v-if="item.rated === undefined " :titre="item.title" :img="item.image_url" :connected="connected" :score="item.score" :id="item.mal_id" :added="isInListPerso(item.mal_id)" @updateScore="updateScore"></CarteInfo>
          <CarteInfo v-else-if="item.rated !== 'Rx' " :titre="item.title" :img="item.image_url" :connected="connected" :score="item.score" :id="item.mal_id" :added="isInListPerso(item.mal_id)" @updateScore="updateScore"></CarteInfo>
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
import { bus } from '../main'

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    linkApi: 'https://api.jikan.moe/v3/',
    indexOfData: 0,
    titre: '',
    img: '',
    dataFromApi: '',
    searchSTR: '',
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
    ],
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
    CarteInfo
  },
  methods: {
    initTable: function (data) {
      this.dataFromApi = data.top
    },
    updateScore: function (infoToUpdate) {
      for (var i in this.listePerso) {
        if (infoToUpdate[1] === this.listePerso[i].anime.mal_id) {
          this.listePerso[i].score = infoToUpdate[0]
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
    bus.$on('updateScoreFromOverLay', (infoFromOverlay) => {
      this.updateScore(infoFromOverlay)
    })
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
