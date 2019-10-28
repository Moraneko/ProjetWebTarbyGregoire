<template>

  <v-content>
      <PageAcceuil/>
      <router-view></router-view>
    </v-content>
</template>

<script>

import PageAcceuil from './components/PageAcceuil'
// import UserPage from './components/UserPage'
/* import Connexion from './components/Connexion' */

export default {
  name: 'App',
  components: {
    // UserPage
    PageAcceuil

  },
  data: () => ({
    //
  })
}
</script>
