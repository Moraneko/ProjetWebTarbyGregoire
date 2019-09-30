<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="Prenom"
      :counter="10"
      :rules="PrenomRules"
      label="Prénom"
      required
    ></v-text-field>

     <v-text-field
       v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nom"
      required
    ></v-text-field>

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

    <v-text-field
    v-on:blur="Verification"
    :counter="60"
    v-model="passwordConfirmed"
    label="confirmez le mot de passe"
    type="password"
    :rules="passwordConfirmedRules"
    required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Vous devez accepter les conditions d\'utilisation']"
      label="Accepter les conditions d'utilisation"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
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
</template>

<script>
export default {
  data: () => ({
    valid: true,
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
    checkbox: false
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
    Verification () {
      if (this.passwordConfirmed === this.password && this.password.length !== 0) {
        this.confirmation = 'Le mot de passe est identique'
      } else if (this.passwordConfirmed !== this.password) {
        this.confirmation = 'Le mot de passe est différent'
      }
    }
  }
}
</script>
