<template>
  <v-navigation-drawer app v-model="drawer" class="indigo">
      <h3 class="pa-3 mt-1">Pesquisa</h3>
      <v-text-field v-model="busca" label="Pesquisar" class="pa-3" variant="solo-filled" density="compact"></v-text-field>
      <v-divider></v-divider>
    <div class="ma-4"><strong>Recentes</strong></div>
    
    <div
      class="mx-auto my-4 cursor"
      v-for="item in listaPerfils"
      :key="item"
    >

      <v-list @click="send(item)" class="w-100 d-flex pa-4">
          <div>
              <v-avatar
                  size="35"
                  class="mr-4"
                  :image="item.foto"
              ></v-avatar>
              <span>{{item.nomeUsuario}}</span>
          </div>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    send: Function
  },

  data: () => ({
    drawer: true,
    listaPerfils: [],
    busca: null,
    lista: []
  }),

  watch: {
    busca(val) {
      console.log("valor buscar", val)
      let newList = this.lista.reduce((arr, item) => {
        let regex = val ? new RegExp(val, 'gi') : null
        let search = regex ? item.nomeUsuario.match(regex) != null : true

        if (search) arr.push(item) 
        return arr
      }, [])

      this.listaPerfils = newList
    }
  },

  mounted() {
      setTimeout(() => {
          this.listarPerfils()
      }, 150)
  },

  methods: {
      listarPerfils() {
          axios.get(`https://localhost:44330/api/Perfil/listar-todos-perfils/${this.$store.state.userData.perfil.id}`)
          .then(resp => {
              console.log('perfils aqui ====>', resp.data)
              this.listaPerfils = resp.data
              this.lista = resp.data
              this.$store.state.userData.listaPerfils = resp.data
          })
      }
  }
}
</script>

<style>
.cursor {
  cursor: pointer;
}
</style>