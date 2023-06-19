<template>
  <v-container class="pt-15" style="max-width: 900px;">
    <info-perfil :perfil="perfilUsuario?? perfil" :show="perfilUsuario == null"/>
    
    <v-divider class="mt-10"></v-divider>

    <v-tabs
      v-model="tab"
      color="#fff"
      align-tabs="center"
    >
      <v-tab :value="1" prepend-icon="fa-regular fa-image" size="small">Publicações</v-tab>
      <v-tab :value="2" prepend-icon="fa-regular fa-bookmark" size="small">Salvos</v-tab>
      <v-tab :value="3" prepend-icon="fa-solid fa-users" size="small">Marcados</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <publicacoes-perfil :lista="listaPublicacoes" :remove="(id) => removerPublicacao(id)"/>
        </v-container>
      </v-window-item>
    </v-window>
    
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import InfoPerfil from '../components/InfoPerfil.vue'
import PublicacoesPerfil from '@/components/PublicacoesPerfil.vue';
export default {
  components: {
    InfoPerfil,
    PublicacoesPerfil 
  },

  data() {
    return {
      tab: null,
      listaPublicacoes: [],
    }
  },

  computed: {
    ...mapState({
      perfil: (state) => state.userData.perfil,
      perfilUsuario: (state) => state.userData.perfilUsuario,
      modal: (state) => state.showCriar
    })
  },

  watch: {
    perfil(item) {
      console.log('otima ideia', item)
      this.obterPublicacoes(item.id)
    },

    perfilUsuario(item) {
      console.log('otima ideia', item)
      this.obterPublicacoes(item.id)
    },

    modal(bool) {
      if (!bool) {
        this.atualizarPerfil()
      }
    }
  }, 
  
  methods: {
    obterPublicacoes(perfilId) {
      console.log('testando de publi')
        axios.get(`https://localhost:44330/api/Publicacao/obter-publicacoes/${perfilId}`)
        .then(resp => {
            console.log('resposta', resp.data)
            this.listaPublicacoes = resp.data
        })
    },

    atualizarPerfil() {
      this.$store.dispatch('userData/obterPerfil', this.perfil)
        .then(resp => {
          this.$store.state.userData.perfil = resp
          // console.log(resp)
          // this.obterPublicacoes(this.perfil.id)
        })
    },

    removerPublicacao(id) {
      axios.delete(`https://localhost:44330/api/Publicacao/deletar-publicacao/${id}`)
        .then(resp => {
            console.log('resposta', resp.data)
            this.atualizarPerfil()
        })
    }
  }
}
</script>

<style>

</style>