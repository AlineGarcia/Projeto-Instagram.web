<template>
  <v-card
    class="mx-auto my-4"
    max-width="444"
    v-for="item in listaPublicacoes"
    :key="item"
  >

    <div class="w-100 d-flex pa-4">
        <div>
            <v-avatar
                size="35"
                class="mr-4"
                :image="$store.state.userData.perfil.foto"
            ></v-avatar>
            <span>Qaulquer mer</span>
        </div>

        <v-spacer></v-spacer>
        
        <v-btn
            icon='fa-solid fa-ellipsis'
        ></v-btn>
    </div>

    <v-img
      :src="'data:image/jpeg;base64,'+item.fotoPublicacao"
      height="400px"
      cover
    ></v-img>

    <v-card-subtitle class="mt-3">
      {{item.legenda}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        icon='fa-regular fa-heart'
      ></v-btn>

      <v-btn 
        icon='fa-regular fa-comment'
      ></v-btn>

      <v-btn 
        icon='fa-solid fa-location-arrow'
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn 
        icon='fa-regular fa-bookmark'
      ></v-btn>

    </v-card-actions>
    <v-divider></v-divider>

    <v-card-text>50 comentários</v-card-text>

    <v-divider></v-divider>


  </v-card>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            listaPublicacoes: [],
        }
    },

    mounted() {
        setTimeout(() => {
            this.listarPublicacoes()
        }, 150)
    },

    methods: {
        listarPublicacoes() {
            axios.get(`https://localhost:44330/api/Publicacao/listar-publicacoes/${this.$store.state.userData.perfil.id}`)
            .then(resp => {
                console.log('publicacoes aqui ====>', resp.data)
                this.listaPublicacoes = resp.data
            })
        }
    }
}
</script>

<style>

</style>