<template>
  <div>
    <v-card @click="ouvrirOverlay()">
        <v-card-title v-if="titre.length > 19" class="d-flex overline justify-center">{{titre.substring(0,19)}}...
        </v-card-title>
        <v-card-title v-else class="d-flex overline justify-center">{{titre}}
        </v-card-title>
        <v-img align-end  v-bind:src="img" width="200" height="300" raised="true"></v-img>
        <v-card-text>
        <v-row align="center">
          <v-rating
            :value="score/2"
            color="amber"
            half-increments
            dense
            size="14"
            readonly
          ></v-rating>
          <div class="grey--text ml-4">{{score}}</div>
        </v-row>
        </v-card-text>
    </v-card>
    <loadingOverlay :loading="loading"></loadingOverlay>
    <InfoOverlay :overlayVisibility="overlayVisibility" :data="apiFetch" :id="id" v-on:fermerOverlay="fermerOverlay"></InfoOverlay>
  </div>
</template>

<script>
import InfoOverlay from './InfoOverlay'
import loadingOverlay from './loadingOverlay'

export default {
  props: {
    titre: String,
    img: String,
    score: Number,
    id: Number
  },
  components: {
    InfoOverlay,
    loadingOverlay
  },
  data: () => ({
    overlayVisibility: false,
    loading: false,
    apiFetch: {}
  }),
  methods: {
    ouvrirOverlay () {
      this.loading = true
      fetch('https://api.jikan.moe/v3/anime/' + this.id).then(response => {
        return response.json()
      }).then(data => {
        this.apiFetch = data
        this.loading = false
        console.log(this.apiFetch.url)
      }).catch(err => {
        console.log(err)
      })
      this.overlayVisibility = true
    },

    fermerOverlay () {
      this.overlayVisibility = false
    }
  }
}
</script>
