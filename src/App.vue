<template>
  <v-content>
      <PageAcceuil/>
    </v-content>
</template>

<script>
import PageAcceuil from './components/PageAcceuil'
// import UserPage from './components/UserPage'
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
