<template>
 <v-app id="inspire">
   <v-navigation-drawer v-model="drawer" app clipped width="200" class="primary">
    <v-list>
      <v-list-item @click="retour" :to="{name: 'Accueil'}" color="black">
          <div class="d-flex flex-row primary align-center">
            <v-icon color="white">home</v-icon> <h3 class="d-flex px-5" style="color: white;">Acceuil</h3>
            </div>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Site Tarby-Grégoire</v-toolbar-title>
       <div class="flex-grow-1"></div>
        <v-toolbar-items v-if="!connected" >
           <v-btn color="#f00000">Inscription</v-btn>
           <v-btn color="#f00000">Connexion</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else >
           <v-btn color="#f00000" class="pr-12"><v-icon class="px-1 mr-3">mdi-account</v-icon>{{userName}}</v-btn>
           <v-btn color="#f00000"><v-icon class="px-1 ">mdi-close</v-icon>Deonnexion</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    <v-form ref="form" class="pa-9" v-model="valid" :lazy-validation="lazy" >
      <v-text-field v-model="Prenom" :counter="10" :rules="PrenomRules" label="Prénom" required ></v-text-field>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nom" required ></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
      <v-text-field v-model="password" :counter="60" label="mot de passe" type="password" hint="Veuillez rentrer un mot de passe contenant au moins 6 caractères" :rules="passwordRules" required ></v-text-field>
      <v-text-field v-on:blur="Verification" :counter="60" v-model="passwordConfirmed" label="confirmez le mot de passe" type="password" :rules="passwordConfirmedRules" required ></v-text-field>
      <v-checkbox v-model="checkbox" :rules="[v => !!v || 'Vous devez accepter les conditions d\'utilisation']" label="Accepter les conditions d'utilisation" required ></v-checkbox>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login"> Valider </v-btn>
      <v-btn color="error" class="mr-4" @click="reset">
        Reinitialiser
            </v-btn>
    </v-form>
  </v-app>
</template>

<script>
import Vue from 'vue'
export default {
  data: () => ({
    valid: false,
    name: '',
    confirmation: '',
    nameRules: [
      v => !!v || 'Le nom est requis',
      v => (v && v.length <= 10) || 'Maximum 10 caractères'
    ],
    Prenom: '',
    PrenomRules: [
      v => !!v || 'Le prénom est requis',
      v => (v && v.length <= 10) || 'Maximum 10 caractères'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail requis',
      v => /.+@.+\..+/.test(v) || 'E-mail doit être valide'
    ],
    password: '',
    passwordConfirmed: '',
    passwordRules: [
      v => !!v || 'Le mot de passe est requis',
      v => (v && v.length >= 6) || 'Minimum 6 caractères'],
    passwordConfirmedRules: [
      v => !!v || 'La conformation du mot de passe est requise'
    ],
    select: null,
    checkbox: false,
    lazy: false
  }),

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$refs.form.reset()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    async login () {
      console.log('Zss')
      // connecter l'utilisateur
      var self = this
      Vue.axios.post('http://localhost:4000/api/sigin', {
        Prenom: self.Prenom,
        email: self.email,
        password: self.password
      }).then(function (response) {
        if (response.data.connect === 'true') {
          console.log(response.data.connect)
          self.$router.push('/')
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    Verification () {
      if (this.passwordConfirmed === this.password && this.password.length !== 0) {
        this.confirmation = 'Le mot de passe est identique'
      } else if (this.passwordConfirmed !== this.password) {
        this.confirmation = 'Le mot de passe est différent'
      }
    },
    created () {
    }
  }
}
</script>
