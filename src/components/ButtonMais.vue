<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props }">
        <div class="d-flex">
            <v-btn
              variant="text"
              v-bind="props"
              block
            >
            <i class="fa-solid fa-bars mr-1"></i>
              Mais
            </v-btn>
        </div>
      </template>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in items" 
          :key="index"
          :value="index"
          @click="send(item.title)"
        >
          <v-list-item-title>{{ index != 2 ? item.title : item.title + (theme.global.current.value.dark ? ' para claro' : ' para escuro') }}</v-list-item-title>
          
          <template v-slot:prepend>
                <v-icon size="small">{{index != 2 ? item.icon : theme.global.current.value.dark ? 'fa-regular fa-sun' : item.icon}}</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { useTheme } from 'vuetify'
import axios from 'axios'
export default {
  setup() {
    const theme = useTheme()

    return {
      theme
    }
  },
data: () => ({
      items: [
        { title: 'Configurações', icon: 'fa-solid fa-gear' },
        { title: 'Salvos', icon: 'fa-regular fa-bookmark' },
        { title: 'Alterar modo', icon: 'fa-regular fa-moon' },
        { title: 'Sair', icon: 'fa-regular fa-circle-xmark' },
      ],
    }),

    computed: {
      ...mapState({
        perfil: (state) => state.userData.perfil,
      })
    },

    watch: {
      perfil(item) {
        console.log('computed perfil', item)
        this.theme.global.name.value = item.tema != null && item.tema != '' ? item.tema : 'light'
      }
    },

    methods: {
      deslogar() {
        sessionStorage.clear()
        this.$router.push('/login')
      },

      send(tipo) {
        console.log('tipo aqui', tipo)
        switch(tipo) {
          case 'Sair':
            this.deslogar()
          break;
          case 'Alterar modo':
            this.modo()
            console.log('vendo o tema', this.$store.state.userData.perfil.tema)
          break;
        }
      },

      modo() {
        axios.put(`https://localhost:44330/api/Perfil/tema/${this.$store.state.userData.perfil.id}`)
          .then(resp => {
            this.theme.global.name.value = resp.data
          })
      },

    }
}
</script>

<style>

</style>