<template>
    <v-navigation-drawer
        @click="openPerfils = []"
        permanent
    >   <h1 class="fonte-logo mt-6 mb-4 text-center">Linstagram</h1>
        <v-list v-model:opened="openPerfils" class="nav-list-menu" nav>
          <v-list-item @click="$router.push('/pagina-inicial')" class="inbox" prepend-icon="fa-solid fa-house" title="Página Inicial" value="inbox"></v-list-item>  
          <ButtonPesquisa><v-list-item class="supervisors" prepend-icon="fa-solid fa-magnifying-glass" title="Pesquisa" value="supervisors"></v-list-item></ButtonPesquisa>
          <v-list-item class="explorar" prepend-icon="fa-solid fa-compass" title="Explorar" value="explorar"></v-list-item>
          <v-list-item class="mensagem" prepend-icon="fa-regular fa-comment-dots" title="Mensagens" value="mensagem"></v-list-item>
          <v-list-item class="notificacao" prepend-icon="fa-regular fa-heart" title="Notificações" value="notificacao"></v-list-item>
          <v-list-item class="criar" :active="$store.state.showCriar" active-color="primary" prepend-icon="fa-regular fa-square-plus" title="Criar" @click="$store.state.showCriar = true" value="criar"></v-list-item>
          <v-list-group value="Actions">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="openPerfils.length ? 'Perfil' : 'Perfils'" 
                active-color="primary"
                value="perfil"
                @click.stop="openPerfils = ['Actions']"
              >
                <template v-slot:prepend>
                  <v-avatar
                    size="30"
                    class="mr-7"
                    :image="$store.state.userData.perfil.foto"
                  ></v-avatar>
                </template>
              </v-list-item>
            </template>

            <v-list-item 
              v-for="item in perfils" :key="item"
              :value="item.id"
              rounded="xl"
              active-color="primary"
              :active="item.id == $store.state.userData.perfil.id"
              @click="selecionarPerfil(item)"
            >
              <template v-slot:prepend>
                <v-badge
                  color="red"
                  dot
                > <v-avatar
                    size="35"
                    class="mr-2"
                    :image="item.foto"
                  ></v-avatar>
                  <v-tooltip
                    activator="parent"
                    location="bottom"
                  >4 Notificações</v-tooltip>
                </v-badge>
              </template>
              <v-list-item-title>{{item.nomeUsuario}}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <ButtonMaisVue></ButtonMaisVue>
          </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
import ButtonMaisVue from '../ButtonMais.vue'
import ButtonPesquisa from '../ButtonPesquisa.vue'
export default {
  data: () => ({
    perfils: [],
    openPerfils: [],
    rail: null,
  }),

  components: {
    ButtonMaisVue,
    ButtonPesquisa
  },

  beforeMount() {
    
  },

  mounted() {
    this.listarPerfils()
  },

  methods: {
    listarPerfils() {
      axios.get(`https://localhost:44330/api/perfil/obter-perfils/${this.$store.state.userData.usuario.id}`)
      .then(resp => {
        console.log('resposta ====>', resp)
        if (resp.data.length < 1) {
          this.$router.push('/gerenciar-perfil')
        } else {
          this.perfils = resp.data
          this.$store.commit('userData/atualizarPerfil', resp.data[0])
        }
      })
    },

    selecionarPerfil(item) {
      this.$store.dispatch('userData/obterPerfil', item)
      .then(resp => {
        console.log(resp)
        this.$store.state.userData.perfil = resp
        this.openPerfils = []
        this.$router.push('/perfil')
      })
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Dosis&family=Roboto:ital,wght@0,300;0,700;0,900;1,300;1,700;1,900&family=Source+Sans+Pro:wght@300;600&display=swap');
.fonte-logo {
  font-family: 'Dancing Script', cursive;
  font-size: 2.100rem;
}

.nav-list-menu i.fas.fa-chevron-down.v-icon.notranslate.v-icon--size-default {
  font-size: 14px;
}

/* .nav-list-menu i.fa-regular.fa-square-plus.v-icon.notranslate.v-icon--size-default:hover {
  font-size: 28px !important;
} */

nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active .inbox:hover { font-size: 18px !important; }
nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active .supervisors:hover { font-size: 18px !important; }
nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active .explorar:hover { font-size: 18px !important; }
nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active .mensagem:hover { font-size: 18px !important; }
nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active .notificacao:hover { font-size: 18px !important; }
nav.v-navigation-drawer.v-navigation-drawer--left.v-navigation-drawer--active .criar:hover { font-size: 18px !important; }
</style>