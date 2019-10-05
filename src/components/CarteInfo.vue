<template>
    <v-card v-if="connected===true" width="200" height="500" class="mx-auto">
      <CarteInfoStatic v-bind:titre="titre" v-bind:img="img" v-bind:score="score"></CarteInfoStatic>
        <v-card-actions class="d-flex flex-direction:column ">
          <v-rating
          color="yellow darken-3"
          background-color="grey darken-1"
          size="14"
          empty-icon="$vuetify.icons.ratingFull"
          half-increments
          hover
          ></v-rating></v-card-actions>
        <v-card-actions v-if="connected===true">
          <v-btn text  class="d-flex justify-center">Ajouter</v-btn>
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
    score: Number
  },
  components: {
    CarteInfoStatic
  },
  data: () => ({
  }),
  created () {
    this.$emit('increment-index')
  }
}
</script>
