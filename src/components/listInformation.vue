<template>
  <v-row class="d-flex flex-wrap">
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>Support</v-expansion-panel-header>
        <v-expansion-panel-content >
            <p><span style="color:aqua">Type</span> : {{data.type}}</p>
            <p><span style="color:aqua">Source</span> : {{data.source}}</p>
            <p><span style="color:aqua">Status</span> : {{data.status}}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Production</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><span style="color:aqua">Producteur :</span><ul><li  v-for="value in data.producers" :key="value.id">{{value.name}}</li></ul></p>
            <p><span style="color:aqua">Licencié par</span><ul><li  v-for="value in data.licensors" :key="value.id">{{value.name}}</li></ul></p>
            <p><span style="color:aqua">Studio</span><ul><li  v-for="value in data.studios" :key="value.id">{{value.name}}</li></ul></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Informations</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><span style="color:aqua">Date de sortie</span> : {{data.aired.string}}</p>
          <p><span style="color:aqua">Episode</span> : {{data.episodes}}</p>
          <p><span style="color:aqua">Durée par épisode</span> : {{data.duration}}</p>
          <p><span style="color:aqua">Genres</span><ul><li  v-for="value in data.genres" :key="value.id">{{value.name}}</li></ul></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Histoire</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p><span style="color:aqua">Synopsis</span> : {{data.synopsis}}</p>
          <p><span style="color:aqua">Background</span> : {{data.background}}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>

export default {
  props: {
    data: Object
  },
  data: () => ({
  })
}
</script>
