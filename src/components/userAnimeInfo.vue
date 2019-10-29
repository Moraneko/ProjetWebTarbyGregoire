<template>
  <div>
    <v-card class=" secondary d-flex align-center ">
        <v-card class=" secondary d-flex flex-row flex-grow-1 align-center " @click="ouvrirOverlay()">
            <div class="d-flex px-12"><v-img align-end  v-bind:src="img" width="100" height="200" raised="true"></v-img></div>
            <h2  class="d-flex text-justify mx-auto" v-if="titre.length > 50" >{{titre.substring(0,50)}}...</h2>
            <h2 class="d-flex text-justify mx-auto" v-else>{{titre}}</h2>
        </v-card>
            <div class="d-flex flex-column align-center pr-9 ml-9">
                <v-rating  v-on:input="updateScore" :value="added[1]/2" color="amber" half-increments hover size="25"></v-rating>
                <div class="grey--text ml-4">{{added[1]}}</div>
            </div>
    </v-card>
    <loadingOverlay :loading="loading"></loadingOverlay>
    <InfoOverlay :overlayVisibility="overlayVisibility" :connected="connected" :data="apiFetch" :id="id" :added="added" v-on:fermerOverlay="fermerOverlay"></InfoOverlay>
  </div>
</template>

<script>
import InfoOverlay from './InfoOverlay'
import loadingOverlay from './loadingOverlay'
import { bus } from '../main'

export default {
  props: {
    titre: String,
    img: String,
    score: Number,
    id: Number,
    index: Number,
    connected: Boolean,
    added: Array
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
    updateScore: function (val) {
      this.$emit('updateScore', [val * 2, this.id])
    },
    ouvrirOverlay () {
      this.loading = true
      fetch('https://api.jikan.moe/v3/anime/' + this.id).then(response => {
        return response.json()
      }).then(data => {
        this.apiFetch = data
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
      this.overlayVisibility = true
    },
    fermerOverlay () {
      this.overlayVisibility = false
    }
  },
  created () {
    bus.$on('delThisAnime2', (idToDel) => {
      console.log('hellow2')
      this.fermerOverlay()
    })
  }
}
</script>
