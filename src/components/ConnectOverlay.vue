<template>
        <v-overlay :absolute="absolute" opacity="0.45" :value="overlayVisibility" z-index="10000">
            <v-card>
                <v-toolbar>
                    <v-toolbar-title>Connexion</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-btn icon @click="callFermerOverlay()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    </v-toolbar>
                    <Connexion></Connexion></v-card>
        </v-overlay>
</template>

<script>
import Connexion from './Connexion'

export default {
  props: {
    overlayVisibility: Boolean
  },
  components: {
    Connexion
  },

  data: () => ({
    absolute: false
  }),
  methods: {
    callFermerOverlay () {
      this.$emit('fermerOverlay')
    },
    ouvrirOverlayConnection () {
      this.$emit('ouvrirOverlayConnection')
    }
  }
}
</script>
