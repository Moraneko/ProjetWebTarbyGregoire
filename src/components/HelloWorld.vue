<template>
 <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      width="200"
      class="primary"
    >
     <v-list-group
          no-action
          sub-group
          color="f00000"
        >
         <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item,index) in genre"
            :key="index"
            link
          >
            <v-list-item-title v-text="item[0]"></v-list-item-title>
          </v-list-item>
      </v-list-group>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      class="primary"
    >
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
        <div><h1 class="d-flex justify-center">Bienvenue sur notre site!</h1><h2>Ici vous pourrez réaliser une liste des animes que vous avez vue afin de donner votre avis et le partager </h2></div>
      </v-card>
      <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; padding: 10px;">
        <v-card
          v-for="item in dataFromApi"
          :key="item.id"
          class="d-flex justify-space-around mb-6 primary"
          tile
          height="500"
          >
          <CarteInfo v-bind:titre="item.title" v-bind:img="item.image_url" v-bind:connected="connected" v-bind:score="item.score" v-on:increment-index="incrementation"></CarteInfo>
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

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    indexOfData: 0,
    titre: '',
    img: '',
    dataFromApi: '',
    connected: true,
    genre: [
      ['aaaaaaa1', '#f00000'],
      ['bbbbbbb2', '#ffffff'],
      ['ccccccc3', '#ffffff']
    ]
  }),
  components: {
    CarteInfo
  },
  methods: {
    initTable: function (data) {
      this.dataFromApi = data.top
      this.updateInfo()
    },
    updateInfo: function () {
      this.img = this.dataFromApi[this.indexOfData].image_url
      this.titre = this.dataFromApi[this.indexOfData].title
    },
    incrementation: function () {
      if (this.indexOfData < this.dataFromApi.length) {
        this.indexOfData++
        this.updateInfo()
      }
    }
  },
  created () {
    this.$vuetify.theme.dark = true
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
