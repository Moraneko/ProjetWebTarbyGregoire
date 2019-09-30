<template>
    <v-card width="200" height="500" class="mx-auto">
      <v-card  @click="doSomething()">
        <v-card-title  class="d-flex overline justify-center">{{titre}}
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
        <v-card-actions v-if="connected===true" class="d-flex flex-direction:column ">
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
</template>

<script>
export default {
  props: {
    titre: String,
    img: String,
    connected: Boolean,
    score: Number
  },
  data: () => (''
  ),
  methods: {
    doSomething () {
      console.log(this.titre)
    }
  },
  created () {
    this.$emit('increment-index')
  }
}
</script>
