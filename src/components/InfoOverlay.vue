<template>
    <v-overlay :absolute="absolute" opacity="0.45" :value="overlayVisibility" z-index="10000">
        <v-toolbar>
                <v-toolbar-title>{{data.title}}</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <div v-if="connected" class="d-flex flex-row align-center">
                  <v-btn text v-if="!added[0]" class="d-flex justify-center">Ajouter</v-btn>
                  <v-btn text v-else class="d-flex justify-center">Retirer</v-btn>
                  <v-rating class="d-flex pr-4" v-on:input="updateScore2" :value="added[1]/2" :readonly="!added[0]"  color="amber" half-increments hover size="25"></v-rating>
                  <div class="d-flex pl-2" v-if="added[0]">{{added[1]}}</div>
                </div>
                <v-btn icon @click="callFermerOverlay()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
        <v-card class="mx-auto overflow-x-hidden overflow-y-auto">
            <div class="d-inline-flex align-start pa-2">
                <div class="d-flex flex-wrap flex-column">
                   <v-img :src="data.image_url" height="318" width="225"></v-img>
                   <div class="my-4"></div>
                   <h2 v-if="data.title_english!==null || data.title_japanese!==null ">Titre alternatives</h2>
                   <v-divider/>
                   <p v-if="data.title_english!==null"><span style="color:aqua">Anglais</span> : {{data.title_english}}</p>
                   <p v-if="data.title_japanese!==null"><span style="color:aqua">Japonais</span> : {{data.title_japanese}}</p>
                </div>
                <v-divider class="mx-4" vertical></v-divider>
                <div class="d-flex  flex-column">
                    <listInformation :data="data"></listInformation>
                </div>
            </div>
        </v-card>
    </v-overlay>
</template>

<script>
import listInformation from './listInformation'
import { bus } from '../main'

export default {
  props: {
    overlayVisibility: Boolean,
    id: Number,
    data: Object,
    added: Array,
    connected: Boolean
  },
  components: {
    listInformation
  },

  data: () => ({
    absolute: false
  }),
  methods: {
    callFermerOverlay () {
      this.$emit('fermerOverlay')
    },
    updateScore2: function (val) {
      bus.$emit('updateScoreFromOverLay', [val * 2, this.id])
    }
  }
}
</script>
