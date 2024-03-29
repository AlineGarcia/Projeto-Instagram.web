import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PerfilView from '../views/PerfilView.vue'
import CadastroView from '../views/CadastroView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/perfil',
        name: 'perfil',
        component: PerfilView
      },
      {
        path: '/gerenciar-perfil',
        name: 'gerenciar',
        component: () => import('../views/GerenciarPerfil.vue')
      },
      {
        path: '/pagina-inicial',
        name: 'PaginaInicial',
        component: () => import('../views/PaginaInicial.vue')
      }
    ]
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
