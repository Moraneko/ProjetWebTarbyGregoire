<template>
    <v-card v-if="connected===true" width="200" height="500" class="mx-auto">
      <CarteInfoStatic :connected="connected" :index="index" :titre="titre" :img="img" :score="score" :id="id" :added="added" ></CarteInfoStatic>
        <v-card-actions class="d-flex flex-row align-item-center">
          <v-rating v-on:input="updateScore" :value="added[1]/2" :readonly="!added[0]" color="yellow darken-3" background-color="grey darken-1" size="14" empty-icon="$vuetify.icons.ratingFull" half-increments
          hover></v-rating>
          <div class="d-flex pl-2" v-if="added[0]">{{added[1]}}</div>
          </v-card-actions>
        <v-card-actions v-if="connected===true">
          <v-btn  v-if="!added[0]" class="d-flex justify-center" color="blue" @click="addThisAnime()">Ajouter</v-btn>
          <v-btn  v-else class="d-flex justify-center" color="#f00000"  @click="delThisAnime()">Retirer</v-btn>
        </v-card-actions>
    </v-card>
  <v-card v-else width="200" height="300" class="mx-auto mb-n12">
      <CarteInfoStatic :connected="connected" :index="index" :titre="titre" :img="img" :id="id" :added="added" :score="score"></CarteInfoStatic>
  </v-card>
</template>

<script>
import CarteInfoStatic from './CarteInfoStatic'

export default {
  props: {
    titre: String,
    img: String,
    connected: Boolean,
    score: Number,
    id: Number,
    added: Array,
    index: Number
  },
  components: {
    CarteInfoStatic
  },
  methods: {
    updateScore: function (val) {
      this.$emit('updateScore', [val * 2, this.id])
    },
    addThisAnime: function () {
      this.$emit('addThisAnime', this.index)
    },
    delThisAnime: function () {
      this.$emit('delThisAnime', this.id)
    }
  },
  data: () => ({
  }),
  created () {
  }
}
</script>
