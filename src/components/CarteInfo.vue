<template>
    <v-card v-if="connected===true" width="200" height="500" class="mx-auto">
      <CarteInfoStatic :connected="connected" :titre="titre" :img="img" :score="score" :id="id" :added="added" ></CarteInfoStatic>
        <v-card-actions class="d-flex flex-row align-item-center">
          <v-rating v-on:input="updateScore" :value="added[1]/2" :readonly="!added[0]" color="yellow darken-3" background-color="grey darken-1" size="14" empty-icon="$vuetify.icons.ratingFull" half-increments
          hover></v-rating>
          <div class="d-flex pl-2" v-if="added[0]">{{added[1]}}</div>
          </v-card-actions>
        <v-card-actions v-if="connected===true">
          <v-btn text v-if="!added[0]" class="d-flex justify-center">Ajouter</v-btn>
          <v-btn text v-else class="d-flex justify-center">Retirer</v-btn>
        </v-card-actions>
    </v-card>
  <v-card v-else width="200" height="300" class="mx-auto">
      <CarteInfoStatic v-bind:titre="titre" v-bind:img="img" v-bind:score="score"></CarteInfoStatic>
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
    added: Array
  },
  components: {
    CarteInfoStatic
  },
  methods: {
    updateScore: function (val) {
      this.$emit('updateScore', [val * 2, this.id])
    }
  },
  data: () => ({
  }),
  created () {
  }
}
</script>
