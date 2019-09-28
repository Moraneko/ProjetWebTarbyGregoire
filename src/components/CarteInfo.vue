<template>
    <v-card max-width="400" class="mx-auto">
        <v-card-title>{{titre2}}
        </v-card-title>
        <v-img v-bind:src="img2" max-width="400" max-height="300"></v-img>
        <v-card-actions>
        <v-btn text>Click</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: {
    titre: String,
    img: String
  },
  data: () => ({
    titre2: '',
    img2: ''
  }),
  methods: {
    init () {
      this.titre2 = JSON.parse(JSON.stringify(this.titre))
      this.img2 = JSON.parse(JSON.stringify(this.img))
    }
  },
  created () {
    this.init()
    this.$emit('increment-index')
  }
}
</script>
