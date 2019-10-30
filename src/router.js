import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: () => import('./components/PageAcceuil.vue')
    },
    {
      path: '/Utilisateur',
      name: 'Utilisateur',
      component: () => import('./components/UserPage.vue')

    },
    {
      path: '/Connexion',
      name: 'Connexion',
      component: () => import('./components/Connexion.vue')

    },
    {
      path: '/Inscription',
      name: 'Inscription',
      component: () => import('./components/Formulaire.vue')
    },
    {
      path: '*',
      redirect: ''
    }
  ]
})
