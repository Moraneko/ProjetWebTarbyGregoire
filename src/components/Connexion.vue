<template>
<v-card heigh="300" width="800" class="px-5 pb-3">
  <v-form
    ref="form"
    v-model="valid"
    :lazy-validation="lazy"
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
    v-model="password"
    :counter="60"
    label="mot de passe"
    type="password"
    hint="Veuillez rentrer un mot de passe contenant au moins 6 caractères"
    :rules="passwordRules"
    required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      :to="{name: 'Accueil'}"
    >
      Valider
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reinitialiser
          </v-btn>
  </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail requis',
      v => /.+@.+\..+/.test(v) || 'E-mail doit être valide'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Le mot de passe est requis',
      v => (v && v.length >= 6) || 'Minimum 6 caractères'],
    select: null,
    lazy: false

  }),

  methods: {
    async validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$refs.form.reset()
      }
    },
    reset () {
      this.$refs.form.reset()
    },

    async login () {
      // connecter l'utilisateur
      const response = await this.axios.post(this.url + '/api/login', {
        login: 'admin',
        password: 'changethispassword'
      })
      console.log('response is:', response)
    }
  }
}
</script>
