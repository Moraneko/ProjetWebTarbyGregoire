<template>
 <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      width="200"
      class="primary"
    >
     <v-list-group
          v-model="item"
          no-action
          sub-group
          color="f00000"
        >
         <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item,index) in genre"
            :key="index"
            link
          >
            <v-list-item-title v-text="item[0]"></v-list-item-title>
          </v-list-item>
      </v-list-group>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      class="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
       <div class="flex-grow-1"></div>
        <v-toolbar-items >
           <v-btn color="#f00000">Inscription</v-btn>
           <v-btn color="#f00000">Connection</v-btn>
        </v-toolbar-items>
    </v-app-bar>

    <v-content class="primary">
      <v-card outlined tile class="primary">
        <div><h1 align="center">I'm a flexbox container!</h1></div>
      </v-card>
       <div>
    <v-card
      v-for="k in 5"
      :key="k"
      class="d-flex justify-space-around mb-6 primary"
      tile
      height="400"
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2 primary"
        outlined
        tile
      >
      <v-img
      src="https://picsum.photos/id/11/500/300"
      max-width="400"
      max-height="300"></v-img>
        Flex item
      </v-card>
    </v-card>
  </div>
  </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    obj: 1,
    genre: [
      ['aaaaaaa1', '#f00000'],
      ['bbbbbbb2', '#ffffff'],
      ['ccccccc3', '#ffffff']
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
