<template>
  <v-row class="d-flex flex-wrap">
    <v-card height="600" width="700">
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>Support</v-expansion-panel-header>
        <v-expansion-panel-content >
            <p><span style="color:aqua">Type</span> : {{data.type}}</p>
            <p><span style="color:aqua">Source</span> : {{data.source}}</p>
            <p><span style="color:aqua">Status</span> : {{data.status}}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Production</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><span style="color:aqua">Producteur :</span><ul><li  v-for="value in data.producers" :key="value.id">{{value.name}}</li></ul></p>
            <p><span style="color:aqua">Licencié par</span><ul><li  v-for="value in data.licensors" :key="value.id">{{value.name}}</li></ul></p>
            <p><span style="color:aqua">Studio</span><ul><li  v-for="value in data.studios" :key="value.id">{{value.name}}</li></ul></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Informations</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><span style="color:aqua">Date de sortie</span> : {{data.aired.string}}</p>
          <p><span style="color:aqua">Episode</span> : {{data.episodes}}</p>
          <p><span style="color:aqua">Durée par épisode</span> : {{data.duration}}</p>
          <p><span style="color:aqua">Genres</span><ul><li  v-for="value in data.genres" :key="value.id">{{value.name}}</li></ul></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Histoire</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><span style="color:aqua">Synopsis</span> : {{data.synopsis}}</p>
          <p v-if="data.background !== null"><span style="color:aqua">Background</span> : {{data.background}}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="avisLocal.length>0">
        <v-expansion-panel-header>Avis utilisateurs du site</v-expansion-panel-header>
        <v-expansion-panel-content  v-for="(item,index) in avisLocal" :key="index">
          <div v-if="item.score!==-1 || item.commentaire !==''" class="d-flex flex-row align-center">
            <span style="color:aqua">{{item.user}}</span>
             <v-rating v-if="item.score!==-1"  class="d-flex px-4" :value="item.score/2" dense readonly color="amber" size="16"></v-rating>
             <div v-if="item.score!==-1">{{item.score}}</div>
           </div>
            <p v-if="item.commentaire !==''" class="d-flex pl-5 pt-2">{{item.commentaire}}</p>
            <v-divider v-if="item.score!==-1 || item.commentaire !==''" class="d-flex mt-2" />
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
      <div v-if="added[0]" class="d-flex align-end">
        <v-textarea v-model="commentaire" class="pl-9 pt-5" label="Commenter" full-width counter outlined maxlength="500" filled no-resize ></v-textarea>
         <v-btn right @click="updateComment" color="blue">Valider</v-btn>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import { bus } from '../main'
import Vue from 'vue'

export default {
  props: {
    data: Object,
    overlayVisibility: Boolean,
    id: Number,
    connected: Boolean,
    added: Array
  },
  data: () => ({
    avisLocal: [],
    commentaire: ''
  }),
  methods: {
    getComment: function () {
      var self = this
      Vue.axios.post('http://localhost:4000/api/getComment', {
        animeID: this.id
      }).then(function (response) {
        self.avisLocal = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateComment: function () {
      bus.$emit('updateComment', [this.commentaire, this.id])
    }
  },
  created () {
    this.getComment()
    bus.$on('updateOverlayInfo', () => {
      if (this.overlayVisibility) {
        this.getComment()
      }
    })
  }

}
</script>
