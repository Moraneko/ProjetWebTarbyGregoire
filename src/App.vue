<template>
  <v-app>
    <v-content>
      <Connexion/>
    </v-content>
  </v-app>
</template>

<script>
import Connexion from './components/Connexion'

export default {
  name: 'App',
  components: {
    Connexion
  },
  data: () => ({
    //
  })
}
</script>
