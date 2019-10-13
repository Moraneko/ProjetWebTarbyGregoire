<template>
    <v-overlay :absolute="absolute" opacity="0.45" :value="overlayVisibility" z-index="10000">
        <v-toolbar>
                <v-toolbar-title>{{data.title}}</v-toolbar-title>
                <div class="flex-grow-1"></div>
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

export default {
  props: {
    overlayVisibility: Boolean,
    id: Number,
    data: Object
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
    }
  }
}
</script>
